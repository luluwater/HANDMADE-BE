const router = require('express').Router()
// const { index } = require('../controllers/blog-controller')
const { getProductList, getFavoriteProductList, addFavoriteProductTable, removeFavoriteProductTable } = require('../controllers/product-controller')
//RESful API

router.get('/', getProductList)
router.get('/', getFavoriteProductList)
router.post('/:productId', addFavoriteProductTable)
router.delete('/:productId', removeFavoriteProductTable)

module.exports = router
