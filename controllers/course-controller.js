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

const getCourseDetail = async (req, res) => {
  const courseId = req.params.courseId
  const [course] = await pool.execute(
    `SELECT course.id, course.name, course.intro, course.price, course.amount, course.course_date, course.course_time, course.note, store.name AS store_name FROM course 
  JOIN store ON course.store_id = store.id WHERE course.id =? `,
    [courseId]
  )
  const [imgs] = await pool.execute(`SELECT * FROM course_img`)

  const response = course.map((v) => {
    const newImgs = imgs.filter((v2) => v2.course_id === v.id)
    const newImagsName = newImgs.map((v2) => v2.img_name)
    v['img_name'] = newImagsName
    return v
  })
  res.json(response)
}

module.exports = { getStoreCourse, getCourseDetail }
