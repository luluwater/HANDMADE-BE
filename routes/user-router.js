const router = require('express').Router()
const { getUserAccount } = require('../controllers/user-account-controller')
const { getUserProductOrders } = require('../controllers/user-details-controller')

router.get('/', getUserAccount)
// router.put('/', getUserAccount)

router.get('/product-orders', getUserProductOrders)

module.exports = router
