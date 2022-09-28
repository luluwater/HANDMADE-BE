const router = require('express').Router()

const { createProductOrder, createProductOrderDetail, getProductOrder, createCourseOrder, createCourseOrderDetail, getCourseOrder } = require('../controllers/order-controller')

const { payByPrime } = require('../middlewares/tapPay')

router.get('/product/:orderId', getProductOrder)
router.get('/course/:orderId', getCourseOrder)

router.post('/product', payByPrime, createProductOrder)
router.post('/product/detail', createProductOrderDetail)

router.post('/course', payByPrime, createCourseOrder)
router.post('/course/detail', createCourseOrderDetail)
// router.post('/tappay', payByPrime)

module.exports = router
