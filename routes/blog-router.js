const router = require('express').Router()

const { getAllBlog, getBlogDetail, createBlog, deleteBlog, updateBlog, uploadBlogImg } = require('../controllers/blog-controller')

router.get('/', getAllBlog)

router.get('/:blogId', getBlogDetail)

router.post('/', createBlog)

router.delete('/:blogId', deleteBlog)

router.put('/:blogId/edit', updateBlog)

router.post('/:blogId/upload_files', uploadBlogImg)

module.exports = router
