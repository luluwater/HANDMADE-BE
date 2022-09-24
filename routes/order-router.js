const router = require('express').Router()
// const { ecpay } = require('../middlewares/ecpay')

const { createProductOrder, createProductOrderDetail, getProductOrder, createCourseOrder, createCourseOrderDetail, getCourseOrder } = require('../controllers/order-controller')

router.get('/product/:orderId', getProductOrder)
router.get('/course/:orderId', getCourseOrder)

router.post('/product', createProductOrder)
router.post('/product/detail', createProductOrderDetail)

router.post('/course', createCourseOrder)
router.post('/course/detail', createCourseOrderDetail)

module.exports = router
