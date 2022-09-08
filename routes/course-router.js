const router = require('express').Router()
const { getStoreCourse, getCourseDetail } = require('../controllers/course-controller')

router.get('/:storeId', getStoreCourse)
router.get('/detail/:courseId', getCourseDetail)

module.exports = router
