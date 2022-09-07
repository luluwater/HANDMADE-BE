const express = require('express')
const controllers = require('./controllers')
const router = express.Router()
const routes = require('./routes')

require('dotenv').config()

const app = express()

app.use('/api', routes)

app.get('/', async (req, res) => {
  // const result=await sendMail();
  res.send('Welcome to Gmail API with NodeJS')
})

app.listen(8080, () => {
  console.log('listening on port ' + 8080)
})
