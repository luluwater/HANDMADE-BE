const router = require('express').Router()
// const { index } = require('../controllers/blog-controller')
const pool = require('../configs/mysql')

//RESful API

// http://localhost:8080/api/blog --> 顯示所有部落格
router.get('/', async (req, res, next) => {
  let [data] = await pool.execute('SELECT * FROM blog')
  res.json(data)
  next()
})

// http://localhost:8080/api/blog --> 顯示所有部落格
router.get('/:id', async (req, res, next) => {
  let [data] = await pool.execute('SELECT * FROM blog')
  res.json(data)
  next()
})

// http://localhost:8080/api/blog --> 顯示所有部落格
router.post('/:id', async (req, res, next) => {
  let [data] = await pool.execute('SELECT * FROM blog')
  res.json(data)
  next()
})

module.exports = router
