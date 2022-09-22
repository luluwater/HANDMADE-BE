const router = require('express').Router()
const { getCategory } = require('../controllers/category-controller')

router.get('/', getCategory)

module.exports = router
