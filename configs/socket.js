const { Server } = require('socket.io')

const SocketServer= (server)=>{

  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      method: ['GET', 'POST'],
      credentials: true,
    },
  })

  io.on('connection', (socket) => {

     socket.on('joinRoom', (room) => {

      socket.join(room.room_title)
      socket.emit('join-room-message',`You've join ${room.room_title} room`)
      //TODO:LOCALHOST 的 USER ID 拿來用
      io.sockets.to(room.room_title).emit("room-broadcast", `${socket.id} has join this room`)
      
      io.sockets.to(room.room_title).emit("typing", `user typing...`)
    
    })

  })
}


module.exports = SocketServer