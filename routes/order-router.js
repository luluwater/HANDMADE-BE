const router = require('express').Router()

const { createProductOrder, createProductOrderDetail, getProductOrder } = require('../controllers/order-controller')

router.get('/product/:orderId', getProductOrder)

router.post('/product', createProductOrder)
router.post('/product/detail', createProductOrderDetail)

module.exports = router
