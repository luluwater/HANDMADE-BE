const pool = require('../configs/mysql')

const getStore = async (req, res) => {
  // console.log(req.params.id)
  // console.log(req.query)
  // console.log(req.body)

  const [data] = await pool.execute(
    'SELECT *, category.category_name, mrt.MRT_station, mrt.station_name FROM store JOIN category ON category.id = category_id JOIN mrt ON MRT_id = mrt.id'
  )

  const [kvImgs] = await pool.execute('SELECT * FROM store_kv')
  const response = data.map((stores) => {
    const newKvImg = kvImgs.filter((kv) => kv.store_id === stores.id)
    const kv_name = newKvImg.map((kv) => kv.kv_img)

    stores['kv_name'] = kv_name
    return stores
  })

  res.json(response)
}

const getStoreDetail = async (req, res) => {
  // console.log(req.params)
  console.log(req)
  // console.log(req.query)
  const id = req.params.id
  console.log(id)

  const [data] = await pool.execute(
    'SELECT *, category.category_name, mrt.MRT_station, mrt.station_name FROM store JOIN category ON category.id = category_id JOIN mrt ON MRT_id = mrt.id WHERE id = ?',
    [id]
  )

  const [kvImgs] = await pool.execute('SELECT * FROM store_kv')
  const response = data.map((stores) => {
    const newKvImg = kvImgs.filter((kv) => kv.store_id === stores.id)
    const kv_name = newKvImg.map((kv) => kv.kv_img)

    stores['kv_name'] = kv_name
    return stores
  })

  res.json(response)
}

module.exports = { getStore, getStoreDetail }
