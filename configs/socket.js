const { Server } = require('socket.io')
const { getChatRoomTest } = require('../controllers/chat-controller')

const SocketServer = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      method: ['GET', 'POST'],
      credentials: true,
    },
  })

  let rooms = await getChatRoomTest()

  io.on('connection', (socket) => {
    socket.emit('roomMsg', '歡迎加入')

    socket.on('roomMsg', (roomMsg) => {
      socket.join(roomMsg.roomName)

      socket.broadcast.to(roomMsg.roomName).emit('roomMsg', `${roomMsg.user?.account} 已加入 ${roomMsg.roomName}`)
    })

    socket.on('sendMsg', (sendMsg) => {
      // io.emit('sendMsg', sendMsg?.room_id)
      console.log('sendMsg.room_id', sendMsg.room_id)
      io.to(sendMsg.room_id).emit('sendMsg', sendMsg)
    })

    socket.on('left', (data) => {
      io.emit('leftMsg', `${data.user.account} 已離開 ${data.room.room_title}`)
    })
  })
}

module.exports = SocketServer
