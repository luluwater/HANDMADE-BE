const router = require('express').Router()
const { getReply, createReply, deleteReply } = require('../controllers/reply-controller')

router.get('/', getReply)

router.post('/', createReply)

router.delete('/', deleteReply)

module.exports = router
