const pool = require('../configs/mysql')
const { v4: uuidv4 } = require('uuid')

//get http://localhost:8080/api/blog
const getAllBlog = async (req, res) => {
  let [blogs] = await pool.execute(
    'SELECT blog.*, category.category_name, user.*, store.id, store.name, store.img_url, blog.id AS blog_id,store.name AS store_name, blog.create_time AS blog_create_time FROM blog JOIN category ON blog.category_id = category.id JOIN user ON blog.user_id = user.id JOIN store ON store.id = blog.store_id WHERE blog.valid = 1  ORDER BY blog.create_time DESC'
  )

  let [tags] = await pool.execute('SELECT tags.* FROM tags')
  let [blogImgs] = await pool.execute('SELECT blog_img.* FROM blog_img')

  for (let i = 0; i < blogs.length; i++) {
    blogs[i].tags = tags.filter((tag) => tag.blog_id === blogs[i].blog_id)
    blogs[i].img_url = blogImgs.filter((img) => img.blog_id === blogs[i].blog_id)
  }

  res.json(blogs)
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

  let [tags] = await pool.execute('SELECT tags.* FROM tags WHERE tags.blog_id = ?', [blogId])
  if (tags.length > 0) blog[0].tags = tags

  res.json({
    comment: {
      comment,
    },
    blog,
  })
}

//post http://localhost:8080/api/blog
const createBlog = async (req, res) => {
  const { id, user_id, title, content, category_id, store_id, create_time, tags } = req.body

  await pool.execute(`INSERT IGNORE INTO blog (id, user_id, title, content, category_id ,store_id, create_time , valid) VALUES (?, ?, ?, ? , ? , ? , ? ,1)`, [
    id,
    user_id,
    title,
    content,
    category_id,
    store_id,
    create_time,
  ])

  await tags.forEach((tag) => {
    console.log(tag)
    pool.execute(`INSERT IGNORE INTO tags (id, blog_id, tag_name) VALUES (?, ?, ?)`, [tag.tagId, tag.blog_id, tag.tag_name])
  })

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

const hideBlog = async (req, res) => {
  const id = req.params.blogId
  if (id === undefined) return

  await pool.execute(`UPDATE blog SET valid = 2 WHERE blog.id = ?`, [id])

  console.log('Blog hide success!!')
  res.send('success hide Blog')
}

const showBlog = async (req, res) => {
  const id = req.params.blogId
  if (id === undefined) return

  await pool.execute(`UPDATE blog SET valid = 1 WHERE blog.id = ?`, [id])

  console.log('Blog return success!!')
  res.send('success return Blog')
}

//put http://localhost:8080/api/blog/:blogId/edit
const updateBlog = async (req, res) => {
  const { blogId } = req.params

  const { title, content, create_time } = req.body

  await pool.execute(`UPDATE blog SET title= ?, content= ? , create_time = ? WHERE blog.id = ? `, [title, content, create_time, blogId])

  console.log('Blog UPDATE success!!')
  res.status(200).json('Blog UPDATE success!!')
}

const uploadBlogImg = async (req, res) => {
  if (req.files.length <= 0) return

  const id = uuidv4()
  const imgUrl = await req.files[0].filename
  const blogId = req.params.blogId

  console.log('imgUrlimgUrl', imgUrl)

  await pool.execute('INSERT IGNORE INTO blog_img (id, img_name, blog_id) VALUES (? , ? , ?)', [id, imgUrl, blogId])

  console.log('success')
  res.json(req.files[0])
}

module.exports = {
  getAllBlog,
  getBlogDetail,
  createBlog,
  deleteBlog,
  updateBlog,
  uploadBlogImg,
  hideBlog,
  showBlog,
}
