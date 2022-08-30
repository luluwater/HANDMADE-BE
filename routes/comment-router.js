const router = require('express').Router()
const pool = require('../configs/mysql')

//RESEful API

// http://localhost:8080/api/comment --> 插入留言
router.post('/', async (req, res) => {


  const {id, content, user_id , blog_id, comment_date } = req.body

 await pool.execute(`INSERT IGNORE INTO comment (id, content, user_id, blog_id, comment_date) VALUES (?, ?, ?, ? , ?)`,[ id, content, user_id, blog_id, comment_date])

 console.log(comment_date)
 res.send('success')

})






module.exports = router
