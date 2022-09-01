const pool = require('../configs/mysql')

const getReply = async (req, res) => {
  
  let [reply] = await pool.execute(
    'SELECT reply.*, user.*, comment.id, reply.id AS reply_id, user.id AS user_id FROM reply JOIN user ON reply.user_id = user.id JOIN comment ON reply.comment_id = comment.id ORDER BY reply.reply_date DESC'
  )

  res.json(reply);
}

const createReply = async (req, res) => {

  const {id, reply_content, user_id , reply_date, comment_id } = req.body

 await pool.execute(`INSERT IGNORE INTO reply (id, reply_content, user_id, reply_date, comment_id) VALUES (?, ?, ?, ? , ?)`,[ id, reply_content, user_id, reply_date, comment_id])

 console.log('success submit')
 res.send('success')

}


module.exports = {
  getReply,
  createReply,
}