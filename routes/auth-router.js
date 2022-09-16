const router = require('express').Router()
const { login , logout ,register} = require('../controllers/auth-cotroller')
// const { authorize } = require('../configs/googleAuth')

router.post('/login',login )
router.post('/logout', logout)
router.post('/register', register)

module.exports = router
