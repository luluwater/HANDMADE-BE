const router = require('express').Router()
const { getUserAccount } = require('../controllers/user-account-controller')
const { getUserProductsOrders } = require('../controllers/user-orders-controller')
const { getUserCoursesOrders } = require('../controllers/user-orders-controller')

router.get('/', getUserAccount)
// router.put('/', getUserAccount)

router.get('/orders-products', getUserProductsOrders)
router.get('/orders-courses', getUserCoursesOrders)

module.exports = router
