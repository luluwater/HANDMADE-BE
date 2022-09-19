const pool = require('../configs/mysql')

//TODO: user session

//post http://localhost:8080/api/user/get-coupon
const getGirlCoupon = async (req, res) => {
  const { user_id } = req.body
  let [checkGirlCoupon] = await pool.execute('SELECT user_id, coupon_id FROM user_discount WHERE user_id = ? AND coupon_id = 27', [user_id])

  if (checkGirlCoupon.length == undefined) return res.status(400).json({ message: '請先登入會員' })
  //TODO: 未登入的狀態?
  if (checkGirlCoupon.length > 0) return res.status(400).json({ message: '已經領取過優惠券嚕' })

  let result = await pool.execute(`INSERT INTO user_discount ( user_id, coupon_id, state) VALUES (?, ?, ?)`, [user_id, 27, 1])
  console.log('insert coupon', result)

  res.json({ message: '領取成功' })
}

module.exports = { getGirlCoupon }
