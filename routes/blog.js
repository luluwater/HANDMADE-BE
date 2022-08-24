const router = require('express').Router()
const { index } = require('../controllers/blogController')

router.get('/test', (req, res) => {
  res.send({ a: 1 })
})
router.get('/', index)
// router.get('/message', message)
// router.post('/create', chat)

module.exports = router
