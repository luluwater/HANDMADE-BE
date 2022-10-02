const router = require('express').Router()
const { getChatRooms, getChatRoom, sendChatMessage, getChatMessages,chatImgUpload } = require('../controllers/chat-controller')
const { upload } = require('../middlewares/uploadFiles')

router.get('/', getChatRooms)

router.get('/:chatId', getChatRoom)

router.post('/msg', sendChatMessage)

router.post('/msgImage', upload.array('files'), chatImgUpload)

router.get('/:chatId/msg', getChatMessages)

module.exports = router

