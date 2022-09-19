const pool = require('../configs/mysql')

// TODO: isPrivate 加入
const getChatRoom = async (req, res) => {
  let [rooms] = await pool.execute('SELECT rooms.* FROM rooms')
  let [msg] = await pool.execute('SELECT message.*,user.*,message.id AS message_id FROM message JOIN user ON message.user_id = user.id')

  for (let i = 0; i < rooms.length; i++) {
    rooms[i].msg = msg.filter((m) => m.room_id === rooms[i].id)
  }

  res.json(rooms)
}

//TODO: IDEA 如果再SEND MESSAGE 後拿到 DATA 是不是就可以拿這個 DATA 來 SOCKET ??
const sendChatMessage = async (req, res) => {
  const { id, content, user_id, created_at, room_id } = req.body

  console.log('req.body', req.body)

  await pool.execute(`INSERT IGNORE INTO message (id, content, user_id, created_at, room_id ,isPrivate) VALUES (?, ?, ?, ? , ?, 0 )`, [id, content, user_id, created_at, room_id])

  console.log('INSERT chatMsg success')
  res.send('INSERT chatMsg success')
}

module.exports = {
  getChatRoom,
  sendChatMessage,
}
