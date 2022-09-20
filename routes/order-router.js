const router = require('express').Router()

const { createProductOrder, createProductOrderDetail } = require('../controllers/order-controller')

router.get('/product/:orderId', createProductOrder)

router.post('/product', createProductOrder)
router.post('/product/detail', createProductOrderDetail)

module.exports = router
