const express = require('express')
const router = express.Router()
const pool = require('../configs/mysql')
const argon2 = require('argon2')

router.post('/login', async (req, res, next) => {
  let [users] = await pool.execute('SELECT * FROM user WHERE email= ?', [req.body.email])
  
  //確認資料庫有無此帳號
  if (users.length == 0) {
    return res.status(401).json({ message: '帳號或密碼錯誤' })
  }

  let user = users[0]
  let verifyResult = await argon2.verify(user.password, req.body.password)
  if (!verifyResult) {
    return res.status(401).json({ message: '帳號或密碼錯誤' })
  }

  //把資料拿給前端
  let saveUser = {
    id: user.id,
    name: user.name,
    password: user.password,
  }
  req.session.user = saveUser

  res.json(saveUser)
})

// logout
router.get('/logout', async (req, res, next) => {
  req.session.user = null
  res.json({ message: ' 登出成功' })
})
module.exports = router
