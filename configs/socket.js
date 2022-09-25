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

  // io.on('connection', (socket) => {
  //   socket.emit('rooms', rooms)
  //   socket.on('join', (data) => {
  //     socket.emit('welcome-user-msg', `${data.userData.account} 加入${data.currentChat.room_title}`)
  //   })
  //   socket.on('msgFromClient', (msg) => {
  //     io.emit('responseMsg', msg)
  //   })
  // })

  // io.on('connection', (socket) => {
  //   // console.log('some one connection')

  //   socket.emit('rooms', rooms)

  //   // socket.on('joinRoomMsg', (welcomeMsg) => {
  //   //   console.log('welcomeMsg', welcomeMsg)
  //   //   io.emit('welcomeMsg', welcomeMsg)
  //   // })

  //   // socket.on('sendMessage', (data) => {
  //   //   socket.emit('receiveMsg', data)
  //   // })

  //   // socket.on('sendMsg', (msg) => {
  //   //   console.log(msg)

  //   //   io.emit('responseMsg', msg)
  //   // })

  //   // socket.emit('message', 'welcome to chatCord')
  //   // socket.broadcast.emit('message', 'A user has join the chat')

  //   socket.on('disconnect', () => {
  //     io.emit('message', 'A USER HAS LEFT THE CHAT')
  //   })
  // })

  io.on('connection', (socket) => {
    socket.emit('roomMsg', '歡迎加入')

    socket.on('roomMsg', (roomMsg) => {
      io.emit('roomMsg', roomMsg)
    })

    socket.on('sendMsg', (sendMsg) => {
      console.log('sendMsgsendMsgsendMsg', sendMsg)
      io.emit('sendMsg', sendMsg)
    })

    socket.on('disconnect', () => {
      io.emit('roomMsg', 'A USER HAS LEFT THE CHAT')
    })
  })
}

module.exports = SocketServer
