const router = require('express').Router()
// const { index } = require('../controllers/blog-controller')
const { getProductList, getStoreProduct } = require('../controllers/product-controller')
//RESful API

router.get('/', getProductList)
router.get('/:storeId', getStoreProduct)

module.exports = router
