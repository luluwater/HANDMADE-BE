const { body } = require('express-validator')

const checkLogin = (req, res, next) => {
  // 判斷這個人是否已經登入？
  // session 裡如果沒有 member 這個資料，表示沒有登入過
  if (!req.session.user) {
    // 尚未登入
    return res.status(403).json({ message: '尚未登入' })
  }
  next()
}

const registerRules = [
  // 中間件: 檢查 email 是否合法
  body('account').isLength({ min: 3 }).withMessage('帳號至少為英文長度為3'),
  body('email').isEmail().withMessage('Email 欄位請填寫正確格式'),
  // 中間件: 檢查密碼長度
  body('password').isLength({ min: 8 }).withMessage('密碼長度至少為 8'),
  // 中間件: 檢查 password & confirmPassword 是否一致
  // 客製自己想要的條件
  body('confirmPassword')
    .custom((value, { req }) => {
      return value === req.body.password
    })
    .withMessage('密碼驗證不一致'),
]

module.exports = { checkLogin, registerRules }
