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
  console.log(req)
  const courseId = req.params.courseId
  const [course] = await pool.execute('SELECT * FROM course WHERE id = ?', [courseId])
  res.json(course)
}

module.exports = { getStoreCourse, getCourseDetail }
