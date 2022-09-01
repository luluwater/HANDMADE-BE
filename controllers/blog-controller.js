const pool = require('../configs/mysql')

const getAllBlog = async (req,res) =>{

  let [data] = await pool.execute(
    'SELECT blog.*, category.category_name, user.*, blog.id AS blog_id FROM blog JOIN category ON blog.category_id = category.id JOIN user ON blog.user_id = user.id ORDER BY blog.create_time DESC'
  )
  res.json(data)
}


const getBlogDetail = async (req, res) => {

  const blogId = req.params.blogId

  let [blog] = await pool.execute(
    'SELECT blog.*, category.category_name, user.*, store.*, blog.id AS blog_id FROM blog JOIN category ON blog.category_id = category.id JOIN user ON blog.user_id = user.id JOIN store ON blog.store_id = store.id WHERE blog.id = ?',
    [blogId]
  )
  let [comment] = await pool.execute(
    'SELECT comment.*, blog.id, user.name, user.avatar , comment.id AS comment_id FROM comment JOIN blog ON comment.blog_id = blog.id JOIN user ON comment.user_id = user.id WHERE blog.id = ?', [blogId]
  )

  res.json({
    comment: {
      comment
    },
    blog,
  });

}


// const createBlog = ((req, res) => {

//   const {id, content, user_id , blog_id, comment_date } = req.body

//   await pool.execute(`INSERT IGNORE INTO comment (id, content, user_id, blog_id, comment_date) VALUES (?, ?, ?, ? , ?)`,[ id, content, user_id, blog_id, comment_date])

//   res.status(200).json('Blog created')
// })

// const updateBlog = ((req, res) => {

//   res.status(200).json('Blog updated')
// })

// const deleteBlog = ((req, res) => {
 
//   res.status(200).json('blog deleted')
// })



module.exports = {
  getAllBlog,
  getBlogDetail,
}