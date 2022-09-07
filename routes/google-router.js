const router = require('express').Router()
const { sendMail } = require('../controllers/google-controller')

router.get('/sendmail', sendMail)

module.exports = router;