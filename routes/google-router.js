const router = require('express').Router()
const { sendMail } = require('../controllers/google-controller')

router.get('/sendmail', sendMail)

router.get('/calendar', sendMail)

module.exports = router;