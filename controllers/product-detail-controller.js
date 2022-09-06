const pool = require('../configs/mysql')

const getProductAll = async (req, res) => {
  const [data] = await pool.execute('SELECT * FROM product')
  res.json(data)
}

const getProductDetail = async (req, res) => {
  console.log(req)
  const productId = req.params.productId
  const [product] = await pool.execute('SELECT * FROM product WHERE id = ?', [productId])
  res.json(product)
  res.send('sucess')
}

module.exports = { getProductAll, getProductDetail }
