const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const http = require('http')
const { Server } = require('socket.io')

const chatRouter = require('./routes/chat-router')
const blogRouter = require('./routes/blog-router')


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
io.on('connection', (socket) => {

  socket.emit('messageFormServer',{data:'Welcome to the socket io server'})
  socket.on('messageToServer', (dataFormClient)=>{
    
  })
})



app.use('/api/chat', chatRouter)
app.use('/api/blog', blogRouter)

app.get('/', (req, res) => {
  res.send('homepage')
})

server.listen(PORT, console.log(`webSocket has successfully Start at: ${PORT}`))

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
