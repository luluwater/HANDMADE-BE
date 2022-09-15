const router = require('express').Router()
const { getUserAccount } = require('../controllers/user-account-controller')
const {
  getUserCourseOrders,
  getUserCourseOrderDetails,
  courseOrderDetails,
  courseOrderPay,
  getUserProductOrders,
  getUserProductOrderDetails,
  productOrderDetails,
  productOrderPay,
  getUserCoupons,
} = require('../controllers/user-details-controller')

const { userLikesCourse, userLikesProduct, userLikesBLog } = require('../controllers/user-likes-controller')

router.get('/', getUserAccount)
// router.put('/', getUserAccount)

router.get('/product-orders', getUserProductOrders)
router.get('/product-orders/:orderNumber', getUserProductOrderDetails)
router.get('/product-orders/:orderNumber/details', productOrderDetails)
router.get('/product-orders/:orderNumber/details/pay', productOrderPay)

router.get('/course-orders', getUserCourseOrders)
router.get('/course-orders/:orderNumber', getUserCourseOrderDetails)
router.get('/course-orders/:orderNumber/details', courseOrderDetails)
router.get('/course-orders/:orderNumber/details/pay', courseOrderPay)

router.get('/coupons', getUserCoupons)

router.get('/likes-course', userLikesCourse)
router.get('/likes-product', userLikesProduct)
router.get('/likes-blog', userLikesBLog)

module.exports = router
