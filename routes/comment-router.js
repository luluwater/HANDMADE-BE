const router = require('express').Router()
const { getAllComment, createComment, deleteComment, updateComment } = require('../controllers/comment-controller')

router.get('/:blogId', getAllComment)

router.post('/', createComment)

router.delete('/', deleteComment)

router.put('/', updateComment)

module.exports = router
