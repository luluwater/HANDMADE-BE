const router = require('express').Router()
const { auth, addToSchedule, sendValidationMail, orderConfirmation } = require('../controllers/google-controller')

// router.post('/orderConfirmation', orderConfirmation)

router.post('/validationMail', sendValidationMail)

router.post('/calendar', addToSchedule)

router.post('/auth', auth)

module.exports = router
