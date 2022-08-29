const router = require('express').Router()
// const { index } = require('../controllers/blog-controller')
const pool = require('../configs/mysql')

//RESful API

// http://localhost:8080/api/blog --> 顯示所有部落格
router.get('/', async (req, res) => {
  // let [data] = await pool.execute('SELECT * FROM blog ORDER BY create_time DESC')
  let [data] = await pool.execute('SELECT blog.*, user.*, blog.id AS blog_id FROM blog JOIN user ON blog.user_id = user.id ORDER BY blog.create_time DESC')

  // let [data] = await pool.execute('SELECT blog.*, category.category_name, user.*, blog.id AS blog_id FROM blog JOIN category ON blog.category_id = category.id JOIN user ON blog.user_id = user.id ORDER BY blog.create_time DESC')

  res.json(data)
})

//連結 store,user,category,blog_comment這幾個資料表
router.get('/:blogId', async (req, res) => {
  const blogId = req.params.blogId
  let [data] = await pool.execute('SELECT * FROM blog WHERE id = ?', [blogId])
  res.json(data)
})

// http://localhost:8080/api/blog --> 顯示所有部落格
router.post('/:id', async (req, res, next) => {
  let [data] = await pool.execute('SELECT * FROM blog')
  res.json(data)
  next()
})

module.exports = router
