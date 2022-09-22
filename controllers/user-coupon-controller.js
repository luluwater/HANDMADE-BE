const pool = require('../configs/mysql')

const getGirlCoupon = async (req, res) => {
  const userId = req.params.userId
  let [checkGirlCoupon] = await pool.execute('SELECT user_id, coupon_id FROM user_discount WHERE user_id = ? AND coupon_id = 27', [userId])

  if (checkGirlCoupon.length > 0) return res.status(400).json({ message: '已經領取過優惠券嚕' })
  if (checkGirlCoupon.length == undefined) return res.status(400).json({ message: '請先登入會員' })

  let result = await pool.execute(`INSERT INTO user_discount ( user_id, coupon_id, state) VALUES (?, ?, ?)`, [userId, 27, 1])
  console.log('insert coupon', result)

  res.json({ message: '領取成功' })
}

module.exports = { getGirlCoupon }
