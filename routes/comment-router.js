const router = require('express').Router()
const pool = require('../configs/mysql')

//RESEful API

// http://localhost:8080/api/comment --> 插入留言
router.post('/', async (req, res) => {


  const {id, content, user_id , blog_id } = req.body

 await pool.execute(`INSERT IGNORE INTO comment (id, content, user_id, blog_id) VALUES (?, ?, ?, ? )`,[ id, content, user_id, blog_id])

 res.send('success')

})






module.exports = router
