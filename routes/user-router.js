const router = require('express').Router()
const { getUserAccount, updateUserPassword, updateUserAccount, updateUserAvatar, getAvatar } = require('../controllers/user-account-controller')
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
  updateUserCourseComment,
  updateUserProductComment,
} = require('../controllers/user-details-controller')
const { userLikesCourse, userLikesProduct } = require('../controllers/user-likes-controller')
const { getUserBlog } = require('../controllers/user-blog-controller')
const { upload } = require('../middlewares/uploadFiles')

router.get('/:userId', getUserAccount)
router.put('/password', updateUserPassword)
router.put('/account', updateUserAccount)
router.put('/avatar', upload.array('files'), updateUserAvatar)
router.get('/avatar/img', getAvatar)

router.get('/:userId/product-orders', getUserProductOrders)
router.put('/product-orders/comment', updateUserProductComment)
router.get('/product-orders/:orderNumber', getUserProductOrderDetails)
router.get('/product-orders/:orderNumber/details', productOrderDetails)
router.get('/product-orders/:orderNumber/details/pay', productOrderPay)

router.get('/:userId/course-orders', getUserCourseOrders)
router.put('/course-orders/comment', updateUserCourseComment)
router.get('/course-orders/:orderNumber', getUserCourseOrderDetails)
router.get('/course-orders/:orderNumber/details', courseOrderDetails)
router.get('/course-orders/:orderNumber/details/pay', courseOrderPay)

router.get('/:userId/coupons', getUserCoupons)

router.get('/:userId/likes-course', userLikesCourse)
router.get('/:userId/likes-product', userLikesProduct)
// router.get('/likes-blog', userLikesBLog)

router.put('/:userId/get-coupon', getGirlCoupon)

router.get('/:userId/blog', getUserBlog)

module.exports = router
