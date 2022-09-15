/* eslint-disable prettier/prettier */
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
// const path = require('path')
const chatRouter = require('./routes/chat-router')
const blogRouter = require('./routes/blog-router')
const commentRouter = require('./routes/comment-router')
const replyRouter = require('./routes/reply-router')
const productRouter = require('./routes/product-router')
const courseRouter = require('./routes/course-router')
const storeRouter = require('./routes/store-router')
const userRouter = require('./routes/user-router')

// Login
const Login = require('./routes/login')
// SignUp
const SignUp = require('./routes/SignUp')
const PORT = process.env.PORT || 8080

const corsOptions = {
  // 如果要讓 cookie 可以跨網域存取，這邊要設定 credentials
  // 且 origin 也要設定
  credentials: true,
  origin: ['http://localhost:3000'],
}
app.use(cors(corsOptions))
app.use(express.json())

// const expressSession = require('express-session')
// // const { response } = require('express')
// // 把 session 存在硬碟中
// var FileStore = require('session-file-store')(expressSession)
// app.use(
//   expressSession({
//     store: new FileStore({
//       // session 儲存的路徑
//       path: path.join(__dirname, '..', 'sessions'),
//     }),
//     secret: process.env.SESSION_SECRET,
//     // 如果 session 沒有改變的話，要不要重新儲存一次？
//     resave: false,
//     // 還沒初始化的，要不要存
//     saveUninitialized: false,
//   })
// )

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/chat', chatRouter)
app.use('/api/blog', blogRouter)
app.use('/api/comment', commentRouter)
app.use('/api/reply', replyRouter)
app.use('/api/product', productRouter)
app.use('/api/course', courseRouter)
app.use('/api/store', storeRouter)
app.use('/api/user', userRouter)

app.use('/api/auth', Login)
// app.use('/api/SignUp', SignUp)

app.get('/', (req, res) => {
  res.send('homepage')
})

// server running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
