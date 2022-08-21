const express = require('express')
const app = express()
const mysql = require('mysql2/promise')
require('dotenv').config
const cors = require('cors')

const PORT = process.env.PORT || 8080

let pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
})

app.use(cors())

app.get('/api/v1.0/blog', async (req, res, next) => {
  let [data] = await pool.execute('SELECT * FROM blog')
  console.log(data)
  res.json(data)
})

app.get('/', (req, res) => {
  res.send('homepage')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
