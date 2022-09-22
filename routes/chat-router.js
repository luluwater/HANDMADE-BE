const router = require('express').Router()
const { getChatRooms, getChatRoom, sendChatMessage, getChatMessages } = require('../controllers/chat-controller')

router.get('/', getChatRooms)

router.get('/:chatId', getChatRoom)

router.post('/msg', sendChatMessage)

router.get('/:chatId/msg', getChatMessages)

module.exports = router
