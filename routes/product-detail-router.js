const router = require('express').Router()
const getProductDetail = require('../controllers/product-detail-controller')
router.get('/', getProductDetail)
module.exports = router
