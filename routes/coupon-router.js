const router = require('express').Router()

const { deleteUserCoupon } = require('../controllers/coupon-controller')

router.delete('/', deleteUserCoupon)

module.exports = router
