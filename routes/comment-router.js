const router = require('express').Router()
const {getAllComment, createComment,deleteComment} = require('../controllers/comment-controller')

router.get('/:blogId',getAllComment)

router.post('/', createComment)

router.delete('/', deleteComment)

module.exports = router

