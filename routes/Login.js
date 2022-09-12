const express = require('express')
// 建立 Router 物件
const router = express.Router()
const pool = require('../configs/mysql')
const bcrypt = require('bcrypt')

router.post('/login', async (req, res, next) => {
  let [user] = await pool.execute('SELECT * FROM WHERE email = ?', [req.body.email])
  //確認user有無此信箱的資料
  if(user.length == 0){
    return res.status(401).json({messge:'信箱或密碼錯誤'})
  }
})
let user = users[0]
let compareResult = await argon2.verify(user.password,req.body.password)
if(!compareResult){
    return res.status(401).json({message:'帳號或密碼錯誤'})

}
let saveUserData = {
    id:user.id,
    name:user.name,
    account:user.account,
    password:user.password,
    crate_time:

}