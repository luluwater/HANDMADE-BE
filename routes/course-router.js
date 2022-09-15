const router = require('express').Router()
const { getStoreCourse, getAllCourse, addFavoriteCourseTable, removeFavoriteCourseTable } = require('../controllers/course-controller')

router.get('/:storeId', getStoreCourse)
router.get('/', getAllCourse)
router.post('/:courseId', addFavoriteCourseTable)
router.delete('/:courseId', removeFavoriteCourseTable)

module.exports = router
