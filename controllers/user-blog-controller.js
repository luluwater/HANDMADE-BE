const pool = require('../configs/mysql')

const getUserBlog = async (req, res) => {
  let [blogData] = await pool.execute(
    'SELECT blog.*, category.category_name, blog.id AS blog_id FROM blog JOIN category ON blog.category_id = category.id JOIN user ON blog.user_id = user.id WHERE blog.valid != 0 AND user_id = 1 ORDER BY blog.create_time DESC'
  )
  const data = blogData.length === 0 ? 0 : blogData
  res.json(data)
}

module.exports = {
  getUserBlog
}
