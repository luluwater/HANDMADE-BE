const pool = require('../configs/mysql')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const register = async (req, res) => {

    
 const { account, email, password} = req.body
 
  const validateResult = validationResult(req)
  console.log('validateResult', validateResult)
  if (!validateResult.isEmpty()) {
    return res.status(400).json({ errors: validateResult.array() })
  }

  let [users] = await pool.execute('SELECT * FROM user WHERE email = ?', [email])

  if (users.length > 0) return res.status(400).json({ message: '這個 email 已經註冊過' })
  
  let hashedPassword = await bcrypt.hash(password, 10)
  console.log('hashedPassword', hashedPassword)
//   // 資料存到資料庫
//   //   let filename = req.file ? '/uploads/' + req.file.filename : ''
  let result = await pool.execute('INSERT INTO user (account, email, password ) VALUES (?, ?, ? );', [account, email, hashedPassword])

  console.log('insert new user', result)
  
  res.json({ message: 'ok' })
}


// http://localhost:8080/api/auth/login
const login = async (req, res) => {
  let [users] = await pool.execute('SELECT * FROM user WHERE account= ?', [req.body.account])

  // //確認資料庫有無此帳號
  if (users.length == 0) {
    return res.status(401).json({ message: '帳號或密碼錯誤' })
  }

  let user = users[0]

  //TODO:註冊結束後測試
  // let verifyResult = await argon2.verify(user.password)
  // console.log(verifyResult)
  // if (!verifyResult) {
  //   return res.status(401).json({ message: '帳號或密碼錯誤' })
  // }
  // //把資料拿給前端

  let saveUser = {
    id: user.id,
    name: user.name,
    account: user.account,
    password: user.password,
    email: user.email,
    avatar: user.avatar,
    address: user.address,
    create_time: user.create_time,
    birthday: user.birthday,
    phone: user.phone,
    // bitrhday: user.birthday,
    gender: user.gender,
    state: user.state,
  }

  req.session.user = saveUser

  res.json(saveUser)
}

// http://localhost:8080/api/auth/logout
const logout = async (req, res) => {
  req.session.user = null
  res.json({ message: ' 登出成功' })
}

// http://localhost:8080/api/auth/register
// const register = async (req, res) => {
//   req.session.user = null
//   res.json({ message: '註冊成功' })
// }

module.exports = { login, logout, register }
