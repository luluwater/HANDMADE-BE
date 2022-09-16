const pool = require('../configs/mysql')

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
    name:user.name,
    account: user.account,
    password: user.password,
    email: user.email,
    avatar: user.avatar,
    address:user.address,
    create_time:user.create_time,
    birthday:user.birthday
  }

  req.session.user = saveUser

  res.json(saveUser)
}

// http://localhost:8080/api/auth/logout
const logout  = async (req, res) => {
    req.session.user = null
    res.json({ message: ' 登出成功' })
}

// http://localhost:8080/api/auth/register
const register  = async (req, res) => {

}

module.exports = { login, logout, register }
