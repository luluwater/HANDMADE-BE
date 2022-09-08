const router = require('express').Router()
const { sendMail, auth } = require('../controllers/google-controller')

router.get('/sendmail', sendMail)

router.get('/calendar', sendMail)

router.get('/auth', auth)

module.exports = router
