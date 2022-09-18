require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const { upload } = require('./middlewares/uploadFiles')

const pool = require('./configs/mysql')

const app = express()
const chatRouter = require('./routes/chat-router')
const blogRouter = require('./routes/blog-router')
const commentRouter = require('./routes/comment-router')
const replyRouter = require('./routes/reply-router')
const productRouter = require('./routes/product-router')
const courseRouter = require('./routes/course-router')
const storeRouter = require('./routes/store-router')
const userRouter = require('./routes/user-router')
const googleRouter = require('./routes/google-router')
const filterRouter = require('./routes/filter-router')
const http = require('http')
const { Server } = require('socket.io')
const authRouter = require('./routes/auth-router')

const PORT = process.env.PORT || 8080

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000'],
}
app.use(cors(corsOptions))
app.use(express.json())

const expressSession = require('express-session')
var FileStore = require('session-file-store')(expressSession)

app.use(
  expressSession({
    store: new FileStore({
      path: path.join(__dirname, 'sessions'),
    }),
    secret: process.env.SESSION_SECRE,
    resave: false,
    saveUninitialized: false,
  })
)

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
    credentials: true,
  },
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array('files'))

// socket 開始
/**
 * namesSpace 很像 endpoint，但不是真正的 endpoint
 * 可以透過不同的 namespace來創建不同的room
 * join and leaving
 */
io.on('connection', async (socket) => {
  let [rooms] = await pool.execute('SELECT rooms.* FROM rooms')
  let [msg] = await pool.execute('SELECT message.*,user.* FROM message JOIN user ON message.user_id = user.id')

  for (let i = 0; i < rooms.length; i++) {
    rooms[i].msg = msg.filter((m) => m.room_id === rooms[i].id)
  }

  socket.emit('rooms', rooms)
  socket.emit('messageToClient', { welcome: 'wlecome' })
  socket.on('joinRoom', (currentRoom) => {
    console.log(currentRoom)
  })
})

// app.use('/api/chat', chatRouter)
app.use('/api/blog', blogRouter)
app.use('/api/comment', commentRouter)
app.use('/api/reply', replyRouter)
app.use('/api/product', productRouter)
app.use('/api/course', courseRouter)
app.use('/api/store', storeRouter)
app.use('/api/user', userRouter)
app.use('/api/google', googleRouter)
app.use('/api/filter', filterRouter)
app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
  res.send('homepage')
})

server.listen(PORT, () => {
  console.log(`node Server is running on http://localhost:${PORT}`)
})
