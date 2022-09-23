require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const { upload } = require('./middlewares/uploadFiles')

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
const SocketServer = require('./configs/socket')
const categoryRouter = require('./routes/category-router')
const http = require('http')

const authRouter = require('./routes/auth-router')
const orderRouter = require('./routes/order-router')

const PORT = process.env.PORT || 8080

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000'],
}

app.use(express.json())

const expressSession = require('express-session')
var FileStore = require('session-file-store')(expressSession)

app.use(
  expressSession({
    store: new FileStore({
      path: path.join(__dirname, 'sessions'),
    }),
    // secret: process.env.SESSION_SECRET,
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
)

const server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array('files'))

app.use('/api/chat', chatRouter)
app.use('/api/blog', blogRouter)
app.use('/api/comment', commentRouter)
app.use('/api/reply', replyRouter)
app.use('/api/product', productRouter)
app.use('/api/course', courseRouter)
app.use('/api/store', storeRouter)
app.use('/api/user', userRouter)
app.use('/api/google', googleRouter)
app.use('/api/filter', filterRouter)
SocketServer(server)
app.use('/api/category', categoryRouter)
app.use('/api/auth', authRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
  res.send('homepage')
})

server.listen(PORT, () => {
  console.log(`node Server is running on http://localhost:${PORT}`)
})
