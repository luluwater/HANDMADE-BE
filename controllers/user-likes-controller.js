const pool = require('../configs/mysql')

//TODO: user session

//課程收藏
const userLikesCourse = async (req, res) => {
  const userId = req.params.userId
  const data = await pool.execute(
    'SELECT user_favorite_course.*, category.category_en_name, course.store_id, store.name AS store_name, course.name AS course_name, course.price FROM user_favorite_course JOIN user ON user_favorite_course.user_id = user.id JOIN course ON user_favorite_course.course_id = course.id JOIN store ON user_favorite_course.store_id = store.id JOIN category ON user_favorite_course.category_id = category.id WHERE user.id = ?',
    [userId]
  )
  const courseImgs = await pool.execute(`SELECT * FROM course_img`)
  const dataCourseDetail = data[0].map((v) => {
    const newImgs = courseImgs[0].filter((v2) => v2.course_id === v.course_id)
    const newImagsName = newImgs.map((v2) => v2.img_name)
    v['img_name'] = newImagsName
    return v
  })

  const dataCourse = dataCourseDetail.length === 0 ? 0 : dataCourseDetail
  res.json(dataCourse)
}

//商品收藏
const userLikesProduct = async (req, res) => {
  const userId = req.params.userId
  const data = await pool.execute(
    'SELECT user_favorite_product.*, category.category_en_name, product.store_id, store.name AS store_name, product.name AS product_name, product.price, product.amount FROM user_favorite_product JOIN user ON user_favorite_product.user_id = user.id JOIN category ON user_favorite_product.category_id = category.id JOIN product ON user_favorite_product.product_id = product.id JOIN store ON user_favorite_product.store_id = store.id WHERE user.id = ?',
    [userId]
  )
  const productImgs = await pool.execute(`SELECT * FROM product_img`)
  //TODO: 參數改session
  const dataProductDetail = data[0].map((v) => {
    const newImgs = productImgs[0].filter((v2) => v2.product_id === v.product_id)
    const newImagsName = newImgs.map((v2) => v2.img_name)
    v['img_name'] = newImagsName
    return v
  })

  const dataProduct = dataProductDetail.length === 0 ? 0 : dataProductDetail
  res.json(dataProduct)
}

//文章收藏
// const userLikesBLog = async (req, res) => {
//   const [data] = await pool.execute(
//     'SELECT user_favorite_blog.*, category.category_name, blog.create_time, blog.title FROM user_favorite_blog JOIN user ON user_favorite_blog.user_id = user.id JOIN category ON user_favorite_blog.category_id = category.id JOIN blog ON user_favorite_blog.blog_id = blog.id WHERE user.id = 2'
//   )
//   const dataBlog = data.length === 0 ? 0 : data
//   res.json(dataBlog)
// }

module.exports = { userLikesCourse, userLikesProduct }
