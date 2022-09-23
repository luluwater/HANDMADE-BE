const router = require('express').Router()

const { createProductOrder, createProductOrderDetail, getProductOrder, createCourseOrder, createCourseOrderDetail } = require('../controllers/order-controller')

router.get('/product/:orderId', getProductOrder)

router.post('/product', createProductOrder)
router.post('/product/detail', createProductOrderDetail)

router.post('/course', createCourseOrder)
router.post('/course/detail', createCourseOrderDetail)

module.exports = router
