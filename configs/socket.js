const { Server } = require('socket.io')


const SocketServer = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      method: ['GET', 'POST'],
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    socket.emit('roomMsg', '歡迎加入')

    socket.on('roomMsg', (roomMsg) => {
      socket.join(roomMsg.roomName)
      io.emit('joinData', roomMsg)
      socket.broadcast.to(roomMsg.roomName).emit('roomMsg', `${roomMsg.user?.account} 已加入 ${roomMsg.roomName}`)
    })

    socket.on('left', (data) => {
      io.emit('leftMsg', `${data.user.account} 已離開 ${data.room.room_title}`)
    })

    socket.on('leftRoom', (data) => {
      io.emit('leftData', data)
    })

    socket.on('sendMsg', (sendMsg) => {
      socket.join(sendMsg.room_title)
      socket.broadcast.to(sendMsg.room_title).emit('chat', sendMsg)
    })
  })
}

module.exports = SocketServer
