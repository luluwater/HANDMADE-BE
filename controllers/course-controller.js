const pool = require('../configs/mysql')

const getStoreCourse = async (req, res) => {
  const storeId = req.params.storeId
  const [data] = await pool.execute(
    'SELECT course.*,store.name AS store_name, category.category_name FROM course JOIN store ON store_id = store.id JOIN category ON category.id = course.category_id WHERE course.store_id =?',
    [storeId]
  )

  const [courseImgs] = await pool.execute('SELECT course_img.*,course.store_id FROM course_img JOIN course ON course.id = course_id WHERE course_id =?', [storeId])

  const reaponse = data.map((v) => {
    const course_img = courseImgs.map((v2) => v2.img_name)
    v['course_img'] = course_img
    return v
  })

  res.json(reaponse)
}

module.exports = { getStoreCourse }
