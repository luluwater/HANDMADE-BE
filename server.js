const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const chatRouter = require('./routes/chat-router')
const blogRouter = require('./routes/blog-router')
const userRouter = require('./routes/user-router')

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/chat', chatRouter)
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send('homepage')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
