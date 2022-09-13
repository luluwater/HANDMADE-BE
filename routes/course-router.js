const router = require('express').Router()
const { getStoreCourse, getCourseDetail, getCourseComment } = require('../controllers/course-controller')

router.get('/:storeId', getStoreCourse)
router.get('/detail/:courseId', getCourseDetail)
router.get('/comment/:courseCommentId', getCourseComment)

module.exports = router
