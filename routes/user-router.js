const router = require('express').Router()
const { getUserAccount } = require('../controllers/user-account-controller')
const { getUserProductOrders, getUserCourseOrders, getUserCoupons } = require('../controllers/user-details-controller')

router.get('/', getUserAccount)
// router.put('/', getUserAccount)

router.get('/product-orders', getUserProductOrders)
router.get('/course-orders', getUserCourseOrders)
router.get('/coupons', getUserCoupons)

module.exports = router
