const router = require('express').Router()
const { getChatRoom, sendChatMessage } = require('../controllers/chat-controller')

router.get('/', getChatRoom)

router.post('/msg', sendChatMessage)

module.exports = router

