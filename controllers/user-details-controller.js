const pool = require('../configs/mysql')

//TODO: session

const getUserCourseOrders = async (req, res) => {
  const [dataCourse] = await pool.execute(
    'SELECT course_order.*, course_order.name AS course_order_name, payment.name AS payment_name, order_staus.name AS order_staus_name FROM course_order JOIN order_staus ON course_order.order_state_id = order_staus.id JOIN payment ON course_order.payment_id = payment.id JOIN user ON course_order.user_id = user.id WHERE course_order.user_id = 1'
  )
  res.json(dataCourse)
}

const getUserProductOrders = async (req, res) => {
  const [dataProduct] = await pool.execute(
    'SELECT product_order.*, product_order.name AS product_order_name, payment.name AS payment_name, order_staus.name AS order_staus_name FROM product_order JOIN order_staus ON product_order.order_state_id = order_staus.id JOIN payment ON product_order.payment_id = payment.id JOIN user ON product_order.user_id = user.id WHERE product_order.user_id = 1'
  )
  res.json(dataProduct)
}

const getUserCoupons = async (req, res) => {
  const [dataCoupon] = await pool.execute(
    'SELECT user_discount.*, coupon.name AS coupon_name, coupon.discount_code, coupon.start_date, coupon.end_date, coupon_discount, coupon.discount_code FROM user_discount JOIN coupon ON user_discount.coupon_id = coupon.id JOIN user ON user_discount.user_id = user.id WHERE user_discount.user_id = 1'
  )

  res.json(dataCoupon)
}
module.exports = { getUserCourseOrders, getUserProductOrders, getUserCoupons }

// state(user_discount)為結帳時是否使用 0:用 / 1:未用
// 1. 可使用 : end_date(coupon) > now + state=1 (user_discount)
// 2. 已失效 : -已失效 end_date(coupon) < now + state=1 (user_discount)
//             -已使用 state=0 (user_discount)
