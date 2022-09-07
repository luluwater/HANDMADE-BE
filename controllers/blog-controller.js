const pool = require('../configs/mysql')

//get http://localhost:8080/api/blog
const getAllBlog = async (req, res) => {
  let [data] = await pool.execute(
    'SELECT blog.*, category.category_name, user.*, blog.id AS blog_id FROM blog JOIN category ON blog.category_id = category.id JOIN user ON blog.user_id = user.id WHERE blog.valid = 1  ORDER BY blog.create_time DESC'
  )
  res.json(data)
}

//get http://localhost:8080/api/blog/:blogId
const getBlogDetail = async (req, res) => {
  const blogId = req.params.blogId

  let [blog] = await pool.execute(
    'SELECT blog.*, category.category_name, user.*, store.*, blog.id AS blog_id, blog.create_time AS blog_create_time FROM blog JOIN category ON blog.category_id = category.id JOIN user ON blog.user_id = user.id JOIN store ON blog.store_id = store.id WHERE blog.id = ?',
    [blogId]
  )
  let [comment] = await pool.execute(
    'SELECT comment.*, blog.id, user.name, user.avatar , comment.id AS comment_id FROM comment JOIN blog ON comment.blog_id = blog.id JOIN user ON comment.user_id = user.id WHERE blog.id = ?',
    [blogId]
  )

  res.json({
    comment: {
      comment,
    },
    blog,
  })
}

//post http://localhost:8080/api/blog
const createBlog = async (req, res) => {
  const { id, user_id, title, content, category_id, store_id, tag, create_time } = req.body

  await pool.execute(`INSERT IGNORE INTO blog (id, user_id, title, content, category_id ,store_id , tag , create_time) VALUES (?, ?, ?, ? , ? , ? , ? , ?)`, [
    id,
    user_id,
    title,
    content,
    category_id,
    store_id,
    tag,
    create_time,
  ])

  console.log('Blog created success!!')
  res.status(200).json('Blog created success!!')
}

//delete http://localhost:8080/api/blog/:blogId
const deleteBlog = async (req, res) => {
  const id = req.params.blogId

  if (id === undefined) return

  await pool.execute(`UPDATE blog SET valid = 0 WHERE blog.id = ?`, [id])

  console.log('Blog delete success!!')
  res.send('success delete Blog')
}

//put http://localhost:8080/api/blog/:blogId/edit
const updateBlog = async (req, res) => {
  const { blogId } = req.params

  const { title, content, create_time } = req.body

  await pool.execute(`UPDATE blog SET title= ?, content= ? , create_time = ? WHERE blog.id = ? `, [title, content, create_time, blogId])

  console.log('Blog UPDATE success!!')
  res.status(200).json('Blog UPDATE success!!')
}

module.exports = {
  getAllBlog,
  getBlogDetail,
  createBlog,
  deleteBlog,
  updateBlog,
}
