const pool = require('../configs/mysql')

const getSelect = async (req, res) => {
  const [store] = await pool.execute(`SELECT store.* FROM store`)
  const [category] = await pool.execute('SELECT category.* FROM category')

  res.json({ store: store, category: category })
}

const getTags = async (req, res) => {
  const [tags] = await pool.execute(`SELECT tags.* FROM tags`)

  res.json(tags)
}

module.exports = { getSelect, getTags }
