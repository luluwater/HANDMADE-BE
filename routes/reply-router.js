const router = require('express').Router()
const pool = require('../configs/mysql')

//RESEful API

//抓到 reply
// comment_id 是變數拿來篩選
router.get('/', async (req, res) => {
  

  let [reply] = await pool.execute(
    'SELECT reply.*, user.*, comment.id, reply.id AS reply_id, user.id AS user_id FROM reply JOIN user ON reply.user_id = user.id JOIN comment ON reply.comment_id = comment.id'
  )

  res.json(reply);
})


// http://localhost:8080/api/comment --> 插入留言
router.post('/', async (req, res) => {


  const {id, content, user_id , blog_id, comment_date } = req.body

 await pool.execute(`INSERT IGNORE INTO comment (id, content, user_id, blog_id, comment_date) VALUES (?, ?, ?, ? , ?)`,[ id, content, user_id, blog_id, comment_date])

 console.log(comment_date)
 res.send('success')

})

module.exports = router
