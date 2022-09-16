// eslint-disable-next-line prettier/prettier

const router = require('express').Router()
const { login, logout, register } = require('../controllers/auth-cotroller')
// const { authorize } = require('../configs/googleAuth')
const { registerRules } = require('../middlewares/auth')

router.post('/login', login)
router.post('/logout', logout)
router.post('/register', register)

module.exports = router
