const router = require('express').Router()
const pool = require('../configs/mysql')

//RESEful API

//用 blog id 去找 comment
router.get('/:blogId', async (req, res) => {
  const blogId = req.params.blogId

  let [comment] = await pool.execute(
    'SELECT comment.*, blog.id, user.name, user.avatar , comment.id AS comment_id FROM comment JOIN blog ON comment.blog_id = blog.id JOIN user ON comment.user_id = user.id WHERE blog.id = ?', [blogId]
  )

//   let [reply] = await pool.execute(
//     'SELECT reply.*, user.*, comment.id, reply.id AS reply_id, user.id AS user_id FROM reply JOIN user ON reply.user_id = user.id JOIN comment ON reply.comment_id = comment.id'
//   )
  
//   for(let i=0;i<comment.length;i++){
//    console.log(comment[i].comment_id)
//    console.log(comment[i])
//   //  if(comment[i].comment_id )
//   }

// console.log("reply",reply)
 

  res.json(comment);
})


// http://localhost:8080/api/comment --> 插入留言
router.post('/', async (req, res) => {


  const {id, content, user_id , blog_id, comment_date } = req.body

 await pool.execute(`INSERT IGNORE INTO comment (id, content, user_id, blog_id, comment_date) VALUES (?, ?, ?, ? , ?)`,[ id, content, user_id, blog_id, comment_date])

 console.log(comment_date)
 res.send('success')

})

module.exports = router









module.exports = router
