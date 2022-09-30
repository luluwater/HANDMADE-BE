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

const getAllCourse = async (req, res) => {
  const [data] = await pool.execute(
    'SELECT course.*,store.name AS store_name, category.category_en_name FROM course JOIN store ON course.store_id = store.id JOIN category ON category.id = course.category_id WHERE isDelete = 0'
  )
  const [courseImgs] = await pool.execute('SELECT course_img.*,course.store_id FROM course_img JOIN course ON course.id = course_img.course_id')

  const userId = req.query.userId

  const favorite = userId !== 'undefined' ? await getFavoriteCourse(userId) : []

  const reaponse = data.map((v) => {
    const course_img = courseImgs.filter((img) => img.course_id === v.id)
    const imgName = course_img.map((img) => img.img_name)
    const isFavorite = favorite.find((v2) => v2.course_id === v.id)
    v['imgName'] = imgName
    v['isFavorite'] = isFavorite ? true : false
    return v
  })

  res.json(reaponse)
}

const getFavoriteCourseList = async (req, res) => {
  //TODO: 參數更改session
  if (req.query.userId === 'undefined') return res.json('未登入')

  const result = await getFavoriteCourse(req.query.userId)
  res.json(result)
}

const addFavoriteCourseTable = async (req, res) => {
  //TODO: 參數更改session
  console.log('id', req.body)
  // console.log(req.query.userId)
  if (req.query.userId === 'undefined') return res.json('未登入')

  await addFavoriteCourse(req.query.userId, req.body.courseId, req.body.storeId, req.body.categoryId)
  res.json({ message: '加入最愛' })
}

const removeFavoriteCourseTable = async (req, res) => {
  //TODO: 參數更改session
  if (req.query.userId === 'undefined') return res.json('未登入')

  await removeFavoriteCourse(req.query.userId, req.body.courseId)
  res.json({ message: '移出最愛' })
}

async function addFavoriteCourse(userId, courseId, storeId, categoryId) {
  let [result] = await pool.execute('INSERT INTO user_favorite_course (user_id, course_id,store_id,category_id) VALUES (?, ?,?,?)', [userId, courseId, storeId, categoryId])
  console.log('addFavoriteCourse', result)
}

async function getFavoriteCourse(userId) {
  let [result] = await pool.execute('SELECT * FROM user_favorite_course WHERE user_id = ?', [userId])
  return result
}

async function removeFavoriteCourse(userId, courseId) {
  let [result] = await pool.execute('DELETE FROM user_favorite_course WHERE user_id = ? AND course_id = ?', [userId, courseId])
  console.log('removeFavoriteCourse', result)
}

////////// Course Detail //////////
const getCourseDetail = async (req, res) => {
  const courseId = req.params.courseId
  const [course] = await pool.execute(
    `SELECT course.id, course.name, course.store_id, course.amount, course.intro, course.price, course.amount, course.course_date, course.course_time, course.note, course.category_id, category.category_en_name,category.category_name, store.address, store.route, store.name AS store_name FROM course 
    JOIN category ON category.id = course.category_id
    JOIN store ON course.store_id = store.id WHERE course.id =? `,
    [courseId]
  )

  const userId = req.query.userId
  const [imgs] = await pool.execute(`SELECT * FROM course_img`)
  const [stocks] = await pool.execute(`SELECT * FROM course_stock WHERE course_stock.stock != "0"`)
  const favorite = userId ? await getFavoriteCourse(userId) : []

  const response = course.map((v) => {
    const newImgs = imgs.filter((v2) => v2.course_id === v.id)
    const newImagsName = newImgs.map((v2) => v2.img_name)
    const newStocks = stocks.filter((v2) => v2.course_id === v.id)
    const isFavorite = favorite.find((v2) => v2.course_id === v.id)

    v['img_name'] = newImagsName
    v['stock_time'] = newStocks
    v['isFavorite'] = isFavorite ? true : false

    console.log('stock_time', newStocks)
    return v
  })
  res.json(response)
}

////////// Course Comment //////////
const getCourseComment = async (req, res) => {
  const courseCommentId = req.params.courseCommentId
  const [courseComment] = await pool.execute(
    `SELECT course_comment.*,user.avatar, user.name AS user_name FROM course_comment JOIN user ON course_comment.user_id = user.id WHERE course_id = ?`,
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

module.exports = { getStoreCourse, getAllCourse, getFavoriteCourseList, addFavoriteCourseTable, removeFavoriteCourseTable, getCourseDetail, getCourseComment }
