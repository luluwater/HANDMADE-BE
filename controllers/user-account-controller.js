const pool = require('../configs/mysql')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

// 所有預設照片
const getAvatar = async (req, res) => {
  const [data] = await pool.execute('SELECT * FROM avatar_img')
  res.json(data)
}

//會員資料
const getUserAccount = async (req, res) => {
  const userId = req.params.userId

  const [data] = await pool.execute('SELECT * FROM user WHERE user.id = ?', [userId])
  res.json(data)
}

//更新照片
const updateUserAvatar = async (req, res) => {
  const { id } = req.body
  const avatar = req.body?.avatar

  if (!avatar && req.files?.[0]?.filename) {
    const avatarUrl = `http://localhost:8080/${req.files[0].filename}`

    await pool.execute(`UPDATE user SET avatar = ? WHERE user.id = ?`, [avatarUrl, parseInt(id)])

    res.json({ message: 'User Avatar 使用上傳' })
  } else {
    await pool.execute(`UPDATE user SET avatar = ? WHERE user.id = ?`, [avatar, id])
    res.json({ message: 'User Avatar 選擇更新成功' })
  }

  return
}



//更新密碼
const updateUserPassword = async (req, res) => {
  const { id, password } = req.body

  // console.log(req.body)
  // console.log(id, password)

  const validateResult = validationResult(req.body)

  if (!validateResult.isEmpty()) {
    return res.status(400).json({ errors: validateResult.array() })
  }

  let hashedPassword = await bcrypt.hash(password, 10)

  if (id === undefined) return
  await pool.execute(`UPDATE user SET password = ? WHERE user.id = ?`, [hashedPassword, id])

  console.log('User password UPDATE success!!')
  res.json({ message: '更新成功' })
}

//更新個人資料
const updateUserAccount = async (req, res) => {
  const { id, name, birthday, phone, address } = req.body

  // console.log(req.body)
  // console.log(id, name, birthday, phone, address)

  const validateResult = validationResult(req.body)

  if (!validateResult.isEmpty()) {
    return res.status(400).json({ errors: validateResult.array() })
  }

  if (id === undefined) return
  await pool.execute(`UPDATE user SET name = ?, birthday = ?, phone = ?, address = ? WHERE user.id = ?`, [name, birthday, phone, address, id])

  console.log('User account UPDATE success!!')
  res.json({ message: 'User account 更新成功' })
}

module.exports = { getUserAccount, updateUserPassword, updateUserAccount, updateUserAvatar, getAvatar }
