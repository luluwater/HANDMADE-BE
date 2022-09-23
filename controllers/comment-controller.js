const pool = require('../configs/mysql')

const getAllComment = async (req, res) => {
  const blogId = req.params.blogId

  let [comment] = await pool.execute(
    'SELECT comment.*, blog.id, user.account, user.avatar , comment.id AS comment_id FROM comment JOIN blog ON comment.blog_id = blog.id JOIN user ON comment.user_id = user.id WHERE blog.id = ? AND comment.valid = 1 ORDER BY comment.comment_date ASC',
    [blogId]
  )

  res.json(comment)
}

const createComment = async (req, res) => {
  const { id, content, user_id, blog_id, comment_date } = req.body

  await pool.execute(`INSERT IGNORE INTO comment (id, content, user_id, blog_id, comment_date, state , valid ) VALUES (?, ?, ?, ? , ? , 1 , 1)`, [
    id,
    content,
    user_id,
    blog_id,
    comment_date,
  ])

  console.log('INSERT comment success')
  res.send('INSERT comment success')
}

const deleteComment = async (req, res) => {
  const { commentId } = req.body

  if (commentId === undefined) return

  await pool.execute(`UPDATE comment SET valid = 0 WHERE id = ?`, [commentId])

  res.send('success delete comment')
}

const updateComment = async (req, res) => {
  const { commentId, contentInput, comment_date } = req.body.updateData

  await pool.execute(`UPDATE comment SET content = ?, comment_date = ?, isEdited = '1' WHERE comment.id = ?`, [contentInput, comment_date, commentId])

  console.log('success update comment')
  res.send('success update comment')
}

module.exports = {
  getAllComment,
  createComment,
  deleteComment,
  updateComment,
}
