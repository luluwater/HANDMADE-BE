const router = require('express').Router()
const pool = require('../configs/mysql')
// const { index } = require('../controllers/blog-controller')

//RESEful API

// http://localhost:8080/api/blog --> 顯示所有部落格
router.get('/', async (req, res) => {
  let [data] = await pool.execute(
    'SELECT blog.*, category.category_name, user.*, blog.id AS blog_id FROM blog JOIN category ON blog.category_id = category.id JOIN user ON blog.user_id = user.id ORDER BY blog.create_time DESC'
  )

  res.json(data)
})

//連結 store,user,category,blog_comment這幾個資料表
//http://localhost:8080/api/blog/:blogId --> 顯示單一部落格
router.get('/:blogId', async (req, res) => {
  const blogId = req.params.blogId

  let [blog] = await pool.execute(
    'SELECT blog.*, category.category_name, user.*, store.*, blog.id AS blog_id FROM blog JOIN category ON blog.category_id = category.id JOIN user ON blog.user_id = user.id JOIN store ON blog.store_id = store.id WHERE blog.id = ?',
    [blogId]
  )
  let [comment] = await pool.execute(
    'SELECT comment.*, blog.id, comment.id AS comment_id FROM comment JOIN blog ON comment.blog_id = blog.id WHERE blog.id = ?', [blogId]
  )
  console.log(comment)
  console.log(blog)

  res.json({
    comment: {
      comment
    },
    blog,
  });
})





module.exports = router
