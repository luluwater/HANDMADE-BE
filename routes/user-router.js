const router = require('express').Router()
const { getUserAccount } = require('../controllers/user-account-controller')
const { getGirlCoupon } = require('../controllers/user-coupon-controller')
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

const { userLikesCourse, userLikesProduct } = require('../controllers/user-likes-controller')

const { getUserBlog } = require('../controllers/user-blog-controller')

router.get('/', getUserAccount)

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
// router.get('/likes-blog', userLikesBLog)

router.post('/get-coupon', getGirlCoupon)

router.get('/blog', getUserBlog)

module.exports = router
