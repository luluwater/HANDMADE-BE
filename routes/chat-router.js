const router = require('express').Router()
const { getChatRooms, getChatRoom, sendChatMessage } = require('../controllers/chat-controller')

router.get('/', getChatRooms)

router.get('/:chatId', getChatRoom)

router.post('/msg', sendChatMessage)

module.exports = router
