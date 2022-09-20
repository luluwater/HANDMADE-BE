const router = require('express').Router()
// const { index } = require('../controllers/blog-controller')
const {
  getProductList,
  getStoreProduct,
  getFavoriteProductList,
  addFavoriteProductTable,
  removeFavoriteProductTable,
  getProductDetail,
  getProductComment,
} = require('../controllers/product-controller')
//RESful API

router.get('/', getProductList)
router.get('/', getFavoriteProductList)
router.post('/:productId', addFavoriteProductTable)
router.delete('/:productId', removeFavoriteProductTable)
router.get('/:storeId', getStoreProduct)
router.get('/detail/:productId', getProductDetail)
router.get('/comment/:productCommentId', getProductComment)

module.exports = router
