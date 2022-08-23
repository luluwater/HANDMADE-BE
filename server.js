const express = require('express')
const app = express()
const pool = require('./config/mysql')
const cors = require('cors')

const PORT = process.env.PORT || 8080

app.use(cors())

app.get('/api/v1.0/blog', async (req, res, next) => {
  let [data] = await pool.execute('SELECT * FROM blog')
  res.json(data)
})

app.get('/', (req, res) => {
  res.send('homepage')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
