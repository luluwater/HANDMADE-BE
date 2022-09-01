const router = require('express').Router()
const { getReply,createReply } = require('../controllers/reply-controller')

router.get('/', getReply)

router.post('/',createReply)

module.exports = router
