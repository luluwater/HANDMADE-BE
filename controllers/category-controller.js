const pool = require('../configs/mysql')

const getCategory = async (req, res) => {
  const [data] = await pool.execute('SELECT * FROM category')

  res.json(data)
}

module.exports = { getCategory }
