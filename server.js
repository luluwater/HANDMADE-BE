const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const chatRouter = require('./routes/chat-router')
const blogRouter = require('./routes/blog-router')
//Login
const Login = require('./routes/Login')

const PORT = process.env.PORT || 8080

const expressSession = require('express-session');
// 把 session 存在硬碟中
var FileStore = require('session-file-store')(expressSession);
app.use(
  expressSession({
    store: new FileStore({
      // session 儲存的路徑
      path: path.join(__dirname, '..', 'sessions'),
    }),
    secret: process.env.SESSION_SECRET,
    // 如果 session 沒有改變的話，要不要重新儲存一次？
    resave: false,
    // 還沒初始化的，要不要存
    saveUninitialized: false,
  })
);



const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/chat', chatRouter)
app.use('/api/blog', blogRouter)
//Login
app.use('/api/Login', Login)

app.get('/', (req, res) => {
  res.send('homepage')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
