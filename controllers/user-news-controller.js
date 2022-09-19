const pool = require('../configs/mysql')

//TODO: user session

//post http://localhost:8080/api/user/get-coupon
const getGirlCoupon = async (req, res) => {
  const { user_id } = req.body
  console.log(req.body)

  //   const [checkGirlCoupon] = await pool.execute('SELECT user_id, coupon_id FROM user_discount WHERE user_id = ? AND coupon_id = 27', [user_id])
  //   if (user_id.length && user_id.length > 0) {
  //   }
  await pool.execute(`INSERT INTO user_discount ( user_id, coupon_id, state) VALUES (?, ?, ?)`, [user_id, 27, 1])
  res.send('success')
}

module.exports = { getGirlCoupon }
