// const router = require('express').Router()
// const { getChatRoom } = require('../controllers/chat-controller')

// // router.get('/', getChatRoom)

// // router.post('/msg', sendChatMessage)

// const { io } = require('../configs/socket')

// // socket 開始
// /**
//  * namesSpace 很像 endpoint，但不是真正的 endpoint
//  * 可以透過不同的 namespace來創建不同的room
//  * join and leaving
//  */

// //1.建立 namespace = '/'
// io.on('connection', async (socket) => {
//   let rooms = await getChatRoom()

//   //2. 把 rooms 傳到前端使用
//   socket.emit('rooms', rooms)
//   //3. 監聽前端的 joinRoom 事件
//   socket.on('joinRoom', (roomToJoin, numberOfUserCallback) => {
//     console.log(rooms)
//     const roomToLeave = Object.keys(rooms)[1]
//     socket.leave(roomToLeave)
//     socket.join(roomToJoin)
//     const nsRoom = rooms.find((room) => {
//       return room.room_title === roomToJoin
//     })
//     socket.emit('historyCatchUp', nsRoom.mssage)
//   })
//   socket.on('newMessageToServer', (msg) => {
//     const fullMsg = {
//       id: '1',
//       create_at: Date.now(),
//       userId: 'angus',
//       content: 'new message',
//       room_id: '3',
//       isPrivate: true,
//     }
//     const roomTitle = Object.keys(socket.rooms)[1]
//     const nsRoom = rooms.find((room) => {
//       return room.room_title === roomTitle
//     })
//     // TODO: sql insert
//     nsRoom.addMessage(fullMsg)
//     io.of('/').to(roomTitle).emit('mseeageToClient', fullMsg)
//   })
// })

// //?沒有 client 可以用了
// // function updateUserInRoom(roomToJoin) {
// //   io.of('/').in(roomToJoin).
// // }

// // socket.on('messageToServer', (dataFormClient) => {
// //   console.log(dataFormClient)
// // })

// // socket.join('level1')
// //當自己加進去 room 時也會顯示 msg
// //第一層 of --> namespace
// //第二層 to --> room
// // io.of('/').to('level1').emit('joined', `${socket.id} say I have joined the level 1 room!`)
// /**
//  * 與上面唯一的不同就是 namespace
//  * room 是只有 server 才有的
//  */
// // io.of('/admin').on('connection', (socket) => {
// //   console.log('Some connected to the admin namespace!!')
// //   io.of('/admin').emit('welcome', 'welcome to the admin channel!')
// // })
// module.exports = router
