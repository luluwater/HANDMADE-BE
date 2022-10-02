const pool = require('../configs/mysql')

const getChatRooms = async (req, res) => {
  let [rooms] = await pool.execute('SELECT rooms.* FROM rooms')
  let [msg] = await pool.execute('SELECT message.*,user.*,message.id AS message_id FROM message JOIN user ON message.user_id = user.id')

  for (let i = 0; i < rooms.length; i++) {
    rooms[i].msg = msg.filter((m) => m.room_id === rooms[i].id)
  }

  res.json(rooms)
}

// http://localhost:8080/api/chat/:chatId/msg
const getChatMessages = async (req, res) => {
  const chatId = req.params.chatId

  let [msg] = await pool.execute('SELECT message.*, user.*, message.id AS message_id FROM message JOIN user ON message.user_id = user.id  WHERE message.room_id = ?', [chatId])

  res.json(msg)
}

const getChatRoom = async (req, res) => {
  const chatId = req.params.chatId

  const roomEndpoint = `/${chatId}`

  let [room] = await pool.execute('SELECT rooms.* FROM rooms WHERE rooms.endpoint = ?', [roomEndpoint])

  let [msg] = await pool.execute('SELECT message.*,user.*,message.id AS message_id FROM message JOIN user ON message.user_id = user.id')

  room.msg = await msg.filter((m) => m.room_id === room.id)

  res.json(room)
}

const getChatRoomTest = async () => {
  let [rooms] = await pool.execute('SELECT rooms.* FROM rooms')
  let [msg] = await pool.execute('SELECT message.*,user.*,message.id AS message_id FROM message JOIN user ON message.user_id = user.id')

  for (let i = 0; i < rooms.length; i++) {
    rooms[i].msg = msg.filter((m) => m.room_id === rooms[i].id)
  }

  return rooms
}

const sendChatMessage = async (req, res) => {
  const { id, content, user_id, created_at, room_id } = req.body

  await pool.execute(`INSERT IGNORE INTO message (id, content, user_id, created_at, room_id ,isPrivate) VALUES (?, ?, ?, ? , ?, 0 )`, [id, content, user_id, created_at, room_id])

  console.log('INSERT chatMsg success')
  res.send('INSERT chatMsg success')
}

const chatImgUpload = (req,res) => {


  if(req.files){
   const MsgImgUrl = `http://localhost:8080/${req.files[0].filename}`
  return res.json(MsgImgUrl)
  }

  return res.status(500).json('no image upload')

}

module.exports = {
  getChatRooms,
  getChatRoom,
  sendChatMessage,
  getChatRoomTest,
  getChatMessages,
  chatImgUpload,
}
