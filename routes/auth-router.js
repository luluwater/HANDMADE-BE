const router = require('express').Router()
const { login, logout, register, resetPassword } = require('../controllers/auth-cotroller')
const { registerRules } = require('../middlewares/auth')

router.post('/login', login)
router.post('/logout', logout)
router.post('/register', registerRules, register)
router.post('/resetPassword', resetPassword)

module.exports = router
