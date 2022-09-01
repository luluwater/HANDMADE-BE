const router = require('express').Router()
const pool = require('../configs/mysql')

router.get('/', async (req, res) => {
  let [data] = await pool.execute(
    'SELECT *, category.category_name, mrt.MRT_station, mrt.station_name FROM store JOIN category ON category.id = category_id JOIN mrt ON MRT_id = mrt.id'
  )
  res.json(data)
})

module.exports = router
