const router = require('express').Router()
const { upload } = require('../middlewares/uploadFiles')
const { getAllBlog, getBlogDetail, createBlog, deleteBlog, updateBlog, uploadBlogImg, hideBlog, showBlog } = require('../controllers/blog-controller')

router.get('/', getAllBlog)

router.get('/:blogId', getBlogDetail)

router.post('/', createBlog)

router.delete('/:blogId', deleteBlog)

router.put('/:blogId/hide', hideBlog)

router.put('/:blogId/show', showBlog)

router.put('/:blogId/edit', updateBlog)

router.post('/:blogId/upload_files', upload.array('files'), uploadBlogImg)

module.exports = router
