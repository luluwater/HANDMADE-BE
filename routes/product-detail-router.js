const router = require('express').Router()
const { getProductAll, getProductDetail } = require('../controllers/product-detail-controller')

router.get('/', getProductAll)
router.get('/:productId', getProductDetail)

module.exports = router
