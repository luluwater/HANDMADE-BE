const router = require('express').Router()
const pool = require('../configs/mysql')

router.get('/', async (req, res, next) => {
  let [data] = await pool.execute('SELECT * FROM user')
  res.json(data)
  next()
})

module.exports = router
