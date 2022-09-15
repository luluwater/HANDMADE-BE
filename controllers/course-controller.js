const pool = require('../configs/mysql')

// 取得某店家的全部課程
const getStoreCourse = async (req, res) => {
  const storeId = req.params.storeId
  const [data] = await pool.execute(
    'SELECT course.*,store.name AS store_name, category.category_en_name FROM course JOIN store ON course.store_id = store.id JOIN category ON category.id = course.category_id WHERE course.store_id =?',
    [storeId]
  )

  const [courseImgs] = await pool.execute('SELECT course_img.*,course.store_id FROM course_img JOIN course ON course.id = course_img.course_id')

  const reaponse = data.map((v) => {
    const course_img = courseImgs.filter((img) => img.course_id === v.id)
    const imgName = course_img.map((img) => img.img_name)
    v['imgName'] = imgName
    return v
  })

  res.json(reaponse)
}

////////// Course Detail //////////
const getCourseDetail = async (req, res) => {
  const courseId = req.params.courseId
  const [course] = await pool.execute(
    `SELECT course.id, course.name, course.amount, course.intro, course.price, course.amount, course.course_date, course.course_time, course.note, category.category_en_name, store.address, store.route, store.name AS store_name FROM course 
    JOIN category ON category.id = course.category_id
    JOIN store ON course.store_id = store.id WHERE course.id =? `,
    [courseId]
  )
  const [imgs] = await pool.execute(`SELECT * FROM course_img`)
  const [stocks] = await pool.execute(`SELECT * FROM course_stock`)

  const response = course.map((v) => {
    const newImgs = imgs.filter((v2) => v2.course_id === v.id)
    const newImagsName = newImgs.map((v2) => v2.img_name)
    const newStocks = stocks.filter((v2) => v2.course_id === v.id)
    v['img_name'] = newImagsName
    v['stock_time'] = newStocks
    return v
  })
  res.json(response)
}

////////// Course Comment //////////
const getCourseComment = async (req, res) => {
  const courseCommentId = req.params.courseCommentId
  const [courseComment] = await pool.execute(
    `SELECT course_comment.*, user.name AS user_name FROM course_comment JOIN user ON course_comment.user_id = user.id WHERE course_id = ?`,
    [courseCommentId]
  )
  const [imgs] = await pool.execute(`SELECT * FROM course_comment_img`)

  const response = courseComment.map((v) => {
    const newImgs = imgs.filter((v2) => v2.id === v.course_comment_img_id)
    const newImagsName = newImgs.map((v2) => v2.img_name)
    v['img_name'] = newImagsName
    return v
  })
  res.json(response)
}

module.exports = { getStoreCourse, getCourseDetail, getCourseComment }
