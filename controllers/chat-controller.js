const pool = require('../configs/mysql')

const getChatRoom = async (req, res) => {
  let [data] = await pool.execute('SELECT rooms.*, message.*, rooms.id AS rooms_id FROM rooms JOIN message ON rooms.rooms_id = message.room_id')
  res.json(data)
}

module.exports = {
  getChatRoom,
}
