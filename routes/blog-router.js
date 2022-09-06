const router = require('express').Router()
const { getAllBlog, getBlogDetail ,createBlog} = require('../controllers/blog-controller')

router.get('/', getAllBlog)

router.get('/:blogId', getBlogDetail)

router.post('/', createBlog)

//TODO: 這樣寫會不會比較好? RESTFUL??
// router.put('/:blogId/edit', updateBlog)

// router.delete('/:blogId/delete', deleteBlog)


module.exports = router