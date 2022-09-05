const router = require('express').Router()
const { getStoreCourse } = require('../controllers/course-controller')

router.get('/:storeId', getStoreCourse)

module.exports = router
