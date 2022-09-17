const router = require('express').Router()
const { getSelect, getTags } = require('../controllers/filter-controller')

router.get('/select', getSelect)

router.get('/tags', getTags)

module.exports = router
