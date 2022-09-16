const router = require('express').Router()
const { getStore, getStoreDetail } = require('../controllers/store-controller')

router.get('/', getStore)

router.get('/:storeId', getStoreDetail)

module.exports = router
