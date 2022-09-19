const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const { upload } = require('./middlewares/uploadFiles')

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
const http = require('http')

const PORT = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)


app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
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

app.get('/', (req, res) => {
  res.send('homepage')
})

server.listen(PORT, () => {
  console.log(`node Server is running on http://localhost:${PORT}`)
})