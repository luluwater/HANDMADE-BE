/* eslint-disable prettier/prettier */
const router = require('express').Router()
const { getStoreCourse, getCourseDetail, getCourseComment, getAllCourse, addFavoriteCourseTable, removeFavoriteCourseTable } = require('../controllers/course-controller')

router.get('/:storeId', getStoreCourse)
router.get('/', getAllCourse)
router.post('/:courseId', addFavoriteCourseTable)
router.delete('/:courseId', removeFavoriteCourseTable)
router.get('/detail/:courseId', getCourseDetail)
router.get('/comment/:courseCommentId', getCourseComment)

module.exports = router
