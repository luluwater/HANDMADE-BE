const router = require('express').Router()
// const { index } = require('../controllers/blog-controller')
const { getProductList } = require('../controllers/product-controller')
//RESful API

router.get('/', getProductList)

module.exports = router
