// const express = require('express')
// const app = express()
// const http = require('http')
// const { Server } = require('socket.io')
// const SOCKET_PORT = process.env.SOCKET_PORT ||8000

// const server = http.createServer(app)
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     method: ['GET', 'POST'],
//   },
// })

// server.listen(SOCKET_PORT, console.log(`webSocket has successfully Start at: ${SOCKET_PORT}`))

// module.exports = { io }




// // const { io } = require('../configs/socket')


// // // socket 開始
// // /**
// //  * namesSpace 很像 endpoint，但不是真正的 endpoint
// //  * 可以透過不同的 namespace來創建不同的room
// //  * join and leaving
// //  */
// // io.on('connection', async (socket) => {
// //   let rooms = await getChatRoom()
// //   rooms.forEach((room)=>{
// //     console.log(room)
// //   })

// //   console.log('rooms in connection')
// //   socket.emit('messageFormServer', { data: 'Welcome to the socket io server' })
// //   socket.on('messageToServer', (dataFormClient) => {
// //     console.log(dataFormClient)
// //   })

// //   socket.join('level1')
// //   //當自己加進去 room 時也會顯示 msg
// //   //第一層 of --> namespace
// //   //第二層 to --> room
// //   io.of('/').to('level1').emit('joined', `${socket.id} say I have joined the level 1 room!`)
// // })

// /**
//  * 與上面唯一的不同就是 namespace
//  * room 是只有 server 才有的
//  */
// // io.of('/admin').on('connection', (socket) => {
// //   console.log('Some connected to the admin namespace!!')
// //   io.of('/admin').emit('welcome', 'welcome to the admin channel!')
// // })


const socketIo = require('socket.io')

const SocketServer = (server) => {
  const io = socketIo(server)

  io.on('connection',socket=>{
    socket.on('join', async(user)=>{
      console.log('new user joined: ', user)
    })
  })
}

module.exports = SocketServer

