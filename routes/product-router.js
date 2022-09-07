const router = require('express').Router()
// const { index } = require('../controllers/blog-controller')
const { getProductList, getStoreProduct, getFavoriteProductList, addFavoriteProductTable, removeFavoriteProductTable } = require('../controllers/product-controller')
//RESful API

router.get('/', getProductList)
router.get('/', getFavoriteProductList)
router.post('/:productId', addFavoriteProductTable)
router.delete('/:productId', removeFavoriteProductTable)
router.get('/:storeId', getStoreProduct)

module.exports = router
