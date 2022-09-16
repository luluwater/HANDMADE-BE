const router = require('express').Router()
const { getStore, getStoreDetail, getSelect } = require('../controllers/store-controller')

router.get('/', getStore)

router.get('/:storeId', getStoreDetail)

router.post('/', getSelect)

module.exports = router
