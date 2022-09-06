const pool = require('../configs/mysql')

const getProductDetail = async (req, res) => {
  const [detail] = await pool.execute(`SELECT * FROM product`)
  res.json(detail)
}

module.exports = getProductDetail
