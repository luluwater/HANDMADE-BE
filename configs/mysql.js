const mysql = require('mysql2/promise')
require('dotenv').config()

let pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: '',
  database: process.env.DB_NAME,
  connectionLimit: 10,
})

module.exports = pool
