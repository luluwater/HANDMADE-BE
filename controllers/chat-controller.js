const  pool = require('../configs/mysql')

const getChatRoom = async (req,res) =>{

  let [data] = await pool.execute(
    'SELECT namespace.*, rooms.*,  message.*, namespace.id AS  namespace_id,rooms.id AD  FROM namespace JOIN rooms ON rooms.namespace_id = namespace.id JOIN message ON message.room_id = rooms.id'
  )
  res.json(data)
}



module.exports = {
  getChatRoom,
}