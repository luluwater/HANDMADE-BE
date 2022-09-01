const router = require('express').Router()
const { getAllBlog, getBlogDetail} = require('../controllers/blog-controller')

router.get('/', getAllBlog)

router.get('/:blogId', getBlogDetail)

// router.post('/', createBlog)

// router.put('/:blogId', updateBlog)

// router.delete('/:blogId', deleteBlog)


module.exports = router