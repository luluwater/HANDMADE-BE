const router = require('express').Router()
const { getStore, getStoreDetail } = require('../controllers/store-controller')

router.get('/', getStore)

router.get('/:storeId', getStoreDetail)

module.exports = router

//宗鴻原檔
// const router = require('express').Router()
// const pool = require('../configs/mysql')

// router.get('/', async (req, res) => {
//   let [data] = await pool.execute(
//     'SELECT *, category.category_name, mrt.MRT_station, mrt.station_name FROM store JOIN category ON category.id = category_id JOIN mrt ON MRT_id = mrt.id'
//   )
//   res.json(data)
// })

// module.exports = router
