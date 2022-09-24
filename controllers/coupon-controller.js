const pool = require('../configs/mysql')

const deleteUserCoupon = async (req, res) => {
  const { userCouponId } = req.body
  if (userCouponId === undefined) return

  await pool.execute(`UPDATE user_discount SET state = 0 WHERE id = ?`, [userCouponId])

  console.log('success for couponState update')
  res.send('success useCoupon')
}

module.exports = {
  deleteUserCoupon,
}
