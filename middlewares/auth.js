const { body } = require('express-validator')

const checkLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).json({ message: '尚未登入' })
  }
  next()
}

const registerRules = [
  body('account').isLength({ min: 3 }).withMessage('帳號至少為英文長度為3'),
  body('email').isEmail().withMessage('Email 欄位請填寫正確格式'),
  body('password').isLength({ min: 8 }).withMessage('密碼長度至少為 8'),
  body('confirmPassword')
    .custom((value, { req }) => {
      return value === req.body.password
    })
    .withMessage('密碼驗證不一致'),
]

module.exports = { checkLogin, registerRules }
