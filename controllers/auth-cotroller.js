const pool = require('../configs/mysql')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

// http://localhost:8080/api/auth/register
const register = async (req, res) => {
  const { id, avatar, account, email, password, create_time } = req.body

  console.log(req.body)

  const validateResult = validationResult(req.body)

  if (!validateResult.isEmpty()) {
    return res.status(400).json({ errors: validateResult.array() })
  }

  let [users] = await pool.execute('SELECT * FROM user WHERE email = ?', [email])

  let newAvatar = avatar || 'http://localhost:8080/user_048a23c0-41b2-45ca-8e25-0b4f090d3585..png'

  if (users.length > 0) return res.status(400).json({ message: '這個 email 已經註冊過' })

  let hashedPassword = await bcrypt.hash(password, 10)

  let result = await pool.execute('INSERT INTO user (id, avatar, account, email, password, state, create_time ) VALUES (?, ?, ?, ?, ? , ?, ?);', [
    id,
    newAvatar,
    account,
    email,
    hashedPassword,
    1,
    create_time,
  ])

  console.log('insert new user', result)

  res.json({ message: 'ok' })
}

// http://localhost:8080/api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body

  let [users] = await pool.execute('SELECT * FROM user WHERE email= ?', [email])

  if (users.length == 0) return res.status(401).json({ message: '帳號或密碼錯誤' })

  let user = users[0]

  let compareResult = await bcrypt.compare(password, user.password)
  if (!compareResult && password !== user.password) {
    return res.status(401).json({ message: compareResult })
  }

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
    bitrhday: user.birthday,
    gender: user.gender,
    state: user.state,
  }

  req.session.user = saveUser
  console.log('登入成功')
  res.json(saveUser)
}

// http://localhost:8080/api/auth/logout
const logout = async (req, res) => {
  req.session.user = null
  res.json({ message: ' 登出成功' })
}

// http://localhost:8080/api/auth/resetPassword
const resetPassword = async (req, res) => {
  const { email, password } = req.body

  const validateResult = validationResult(req.body)

  if (!validateResult.isEmpty()) {
    return res.status(400).json({ errors: validateResult.array() })
  }

  let hashedPassword = await bcrypt.hash(password, 10)

  if (email === undefined) return
  await pool.execute(`UPDATE user SET password = ? WHERE user.email = ?`, [hashedPassword, email])

  console.log('User google mail in auth controller password UPDATE success!!')
  res.json({ message: '更新成功' })
}

module.exports = { login, logout, register, resetPassword }
