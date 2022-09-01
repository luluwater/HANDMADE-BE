const router = require('express').Router()
const {getAllComment, createComment} = require('../controllers/comment-controller')

router.get('/:blogId',getAllComment)

router.post('/', createComment)

module.exports = router

