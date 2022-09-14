const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const http = require('http')
const { Server } = require('socket.io')

const chatRouter = require('./routes/chat-router')


const PORT = process.env.PORT || 8080

const app = express()


const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// socket 開始
/**
 * namesSpace 很像 endpoint，但不是真正的 endpoint
 * 可以透過不同的 namespace　來創建不同的　room
 * join and leaving
 */
io.on('connection', (socket) => {
  console.log('Some connected to the main namespace!!')
  socket.emit('messageFormServer',{data:'Welcome to the socket io server'})
  socket.on('messageToServer', (dataFormClient)=>{
    console.log(dataFormClient)
  })

  socket.join('level1')
  //當自己加進去 room 時也會顯示 msg
  //第一層 of --> namespace
  //第二層 to --> room
  io.of('/').to('level1').emit('joined',`${socket.id} say I have joined the level 1 room!` )
})

/**
 * 與上面唯一的不同就是 namespace
 * room 是只有 server 才有的
 */
io.of('/admin').on('connection', socket=>{
  console.log('Some connected to the admin namespace!!')
  io.of('/admin').emit('welcome','welcome to the admin channel!')
})



app.use('/api/chat', chatRouter)

app.get('/', (req, res) => {
  res.send('homepage')
})

server.listen(8000, console.log(`webSocket has successfully Start at: ${8000}`))

app.listen(PORT, () => {
  console.log(`node Server is running on http://localhost:${PORT}`)
})
