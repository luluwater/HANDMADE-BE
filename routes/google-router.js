const router = require('express').Router()
const { sendMail, auth, addToSchedule } = require('../controllers/google-controller')

router.get('/sendmail', sendMail)

router.get('/calendar', addToSchedule)

router.get('/auth', auth)

module.exports = router
