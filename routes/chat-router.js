const router = require('express').Router()
const { getChatRoom } = require('../controllers/chat-controller')

router.get('/', getChatRoom)


module.exports = router