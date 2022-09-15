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

  const favorite = await getFavoriteCourse(1)

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
  const result = await getFavoriteCourse(1)
  res.json(result)
}

const addFavoriteCourseTable = async (req, res) => {
  //TODO: 參數更改session
  console.log('id', req.body)

  await addFavoriteCourse(1, req.body.courseId, req.body.storeId, req.body.categoryId)
  res.json({ message: '加入最愛' })
}

const removeFavoriteCourseTable = async (req, res) => {
  //TODO: 參數更改session
  await removeFavoriteCourse(1, req.body.courseId)
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

module.exports = { getStoreCourse, getAllCourse, getFavoriteCourseList, addFavoriteCourseTable, removeFavoriteCourseTable }
