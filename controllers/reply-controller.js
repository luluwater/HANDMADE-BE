const pool = require('../configs/mysql')

//get http://localhost:8080/api/reply
const getReply = async (req, res) => {
  let [reply] = await pool.execute(
    'SELECT reply.*, user.*, comment.id, reply.id AS reply_id, user.id AS user_id FROM reply JOIN user ON reply.user_id = user.id JOIN comment ON reply.comment_id = comment.id WHERE reply.state = 1 ORDER BY reply.reply_date ASC'
  )

  res.json(reply)
}

//post http://localhost:8080/api/reply
const createReply = async (req, res) => {
  const { id, reply_content, user_id, reply_date, comment_id } = req.body

  await pool.execute(`INSERT IGNORE INTO reply (id, reply_content, user_id, reply_date, comment_id, state) VALUES (?, ?, ?, ? , ?, ?)`, [
    id,
    reply_content,
    user_id,
    reply_date,
    comment_id,
    1,
  ])

  console.log('success submit')
  res.send('success')
}

//delete  http://localhost:8080/api/reply
const deleteReply = async (req, res) => {
  const { id } = req.body
  if (id === undefined) return

  await pool.execute(`UPDATE reply SET state = 0 WHERE id = ?`, [id])

  console.log('success deleted')
  res.send('success deleted')
}

module.exports = {
  getReply,
  createReply,
  deleteReply,
}
