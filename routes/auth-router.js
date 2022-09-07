const router = require('express').Router()
const { authorize } = require('../configs/googleAuth')

router.get('/auth', authorize)

module.exports = router
