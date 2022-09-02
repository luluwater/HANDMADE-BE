const pool = require('../configs/mysql')

const getAllComment =  async (req, res) => {
  const blogId = req.params.blogId

  let [comment] = await pool.execute(
    'SELECT comment.*, blog.id, user.name, user.avatar , comment.id AS comment_id FROM comment JOIN blog ON comment.blog_id = blog.id JOIN user ON comment.user_id = user.id WHERE blog.id = ? ORDER BY comment.comment_date ASC', [blogId]
  )
 
  res.json(comment);
}

const createComment = async (req,res) => {

  const {id, content, user_id , blog_id, comment_date } = req.body
  
  console.log(req.body)

  await pool.execute(`INSERT IGNORE INTO comment (id, content, user_id, blog_id, comment_date, state , valid ) VALUES (?, ?, ?, ? , ? , 1 , 1)`,[ id, content, user_id, blog_id, comment_date])

  console.log('INSERT comment success')
  res.send('INSERT comment success')

}



module.exports = {
  getAllComment,
  createComment,
}

