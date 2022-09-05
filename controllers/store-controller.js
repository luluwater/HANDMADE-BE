const pool = require('../configs/mysql')

const getStore = async (req, res) => {
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

module.exports = { getStore }
