const pool = require('../configs/mysql')

//課程訂單All
const getUserCourseOrders = async (req, res) => {
  const userId = req.params.userId

  const [dataCourse] = await pool.execute(
    'SELECT course_order.*, course_order.name AS course_order_name, payment.name AS payment_name, order_staus.name AS order_staus_name FROM course_order JOIN order_staus ON course_order.order_state_id = order_staus.id JOIN payment ON course_order.payment_id = payment.id JOIN user ON course_order.user_id = user.id WHERE course_order.user_id = ? ORDER BY course_order.create_time DESC',
    [userId]
  )

  const data = dataCourse.length === 0 ? 0 : dataCourse
  // console.log(dataCourse.length)

  res.json(data)
}

//課程訂單的收件細節
const getUserCourseOrderDetails = async (req, res) => {
  const order_number = req.params.orderNumber
  const [dataCourseDetails] = await pool.execute(
    'SELECT course_order.*, course_order.name AS course_order_name, user.name AS user_name, payment.name AS payment_name, order_staus.name AS order_staus_name FROM course_order JOIN coupon ON course_order.coupon_id = coupon.id JOIN order_staus ON course_order.order_state_id = order_staus.id JOIN payment ON course_order.payment_id = payment.id JOIN user ON course_order.user_id = user.id WHERE course_order.order_number = ?',
    [order_number]
  )
  res.json(dataCourseDetails)
}

//新增課程訂單的評價
const updateUserCourseComment = async (req, res) => {
  const { user_id, course_id, pubilsh_time, content, score } = req.body
  await pool.execute(`INSERT INTO course_comment (user_id, course_id, pubilsh_time, content, score) VALUES (?, ?, ?, ?, ?)`, [user_id, course_id, pubilsh_time, content, score])

  console.log('User Comment INSERT success!!')
  res.json({ message: 'User Comment 新增成功' })
}

//課程訂單的課程細節
const courseOrderDetails = async (req, res) => {
  const order_number = req.params.orderNumber
  const data = await pool.execute(
    'SELECT course_order_list.*, user_id, course.name AS course_name, course.category_id, category.category_en_name FROM course_order_list JOIN course ON course_order_list.course_id = course.id JOIN category ON course.category_id = category.id JOIN course_order ON course_order_list.order_id = course_order.id WHERE course_order.order_number = ?',
    [order_number]
  )

  const courseImgs = await pool.execute(`SELECT * FROM course_img`)
  const dataCourseDetail = data[0].map((v) => {
    const newImgs = courseImgs[0].filter((v2) => v2.course_id === v.course_id)
    const newImagsName = newImgs.map((v2) => v2.img_name)
    v['img_name'] = newImagsName[0]
    return v
  })
  res.json(dataCourseDetail)
}

//課程訂單的付款細節
const courseOrderPay = async (req, res) => {
  const order_number = req.params.orderNumber
  const [dataCoursePay] = await pool.execute(
    'SELECT course_order.id, discount_type_id, total_amount, coupon.name AS coupon_name, coupon.coupon_discount FROM course_order JOIN coupon ON course_order.coupon_id = coupon.id WHERE course_order.order_number = ?',
    [order_number]
  )
  res.json(dataCoursePay)
}

//商品訂單All
const getUserProductOrders = async (req, res) => {
  const userId = req.params.userId
  const [dataProduct] = await pool.execute(
    'SELECT product_order.*, product_order.name AS product_order_name, user.name AS user_name, payment.name AS payment_name, order_staus.name AS order_staus_name FROM product_order JOIN order_staus ON product_order.order_state_id = order_staus.id JOIN payment ON product_order.payment_id = payment.id JOIN user ON product_order.user_id = user.id WHERE product_order.user_id = ? ORDER BY product_order.create_time DESC',
    [userId]
  )

  const data = dataProduct.length === 0 ? 0 : dataProduct

  res.json(data)
}

//新增商品訂單的評價
const updateUserProductComment = async (req, res) => {
  const { user_id, product_id, pubilsh_time, content, score } = req.body
  await pool.execute(`INSERT INTO product_comment (user_id, product_id, pubilsh_time, content, score) VALUES (?, ?, ?, ?, ?)`, [user_id, product_id, pubilsh_time, content, score])

  console.log('User product INSERT success!!')
  res.json({ message: 'User product 新增成功' })
}

//商品訂單的收件細節
const getUserProductOrderDetails = async (req, res) => {
  const order_number = req.params.orderNumber
  const [dataProductDetails] = await pool.execute(
    'SELECT product_order.*, delivery.name AS delivery_name, product_order.name AS product_order_name, user.name AS user_name, payment.name AS payment_name, order_staus.name AS order_staus_name FROM product_order JOIN coupon ON product_order.coupon_id = coupon.id JOIN order_staus ON product_order.order_state_id = order_staus.id JOIN delivery ON product_order.delivery_id = delivery.id JOIN payment ON product_order.payment_id = payment.id JOIN user ON product_order.user_id = user.id WHERE product_order.order_number = ?',
    [order_number]
  )
  res.json(dataProductDetails)
}

//商品訂單的商品細節
const productOrderDetails = async (req, res) => {
  const order_number = req.params.orderNumber
  const data = await pool.execute(
    'SELECT product_order_list.*, user_id, product.name AS product_name, product.category_id, category.category_en_name FROM product_order_list JOIN product ON product_order_list.product_id = product.id JOIN category ON product.category_id = category.id JOIN product_order ON product_order_list.order_id = product_order.id WHERE product_order.order_number = ?',
    [order_number]
  )

  const productImgs = await pool.execute(`SELECT * FROM product_img`)
  const dataProductDetail = data[0].map((v) => {
    const newImgs = productImgs[0].filter((v2) => v2.product_id === v.product_id)
    const newImagsName = newImgs.map((v2) => v2.img_name)
    v['img_name'] = newImagsName[0]
    return v
  })
  res.json(dataProductDetail)
}

//商品訂單的付款細節
const productOrderPay = async (req, res) => {
  const order_number = req.params.orderNumber
  const [dataProductPay] = await pool.execute(
    'SELECT product_order.id, discount_type_id, total_amount, coupon.name AS coupon_name, coupon.coupon_discount FROM product_order JOIN coupon ON product_order.coupon_id = coupon.id WHERE product_order.order_number = ?',
    [order_number]
  )
  res.json(dataProductPay)
}

//coupon
const getUserCoupons = async (req, res) => {
  const userId = req.params.userId
  const [dataCoupon] = await pool.execute(
    'SELECT user_discount.*, coupon.name AS coupon_name, coupon.discount_code, coupon.start_date, coupon.discount_type_id, coupon.end_date, pay, coupon_discount, coupon.discount_code FROM user_discount JOIN coupon ON user_discount.coupon_id = coupon.id JOIN user ON user_discount.user_id = user.id WHERE user_discount.user_id = ?',
    [userId]
  )

  const data = dataCoupon.length === 0 ? 0 : dataCoupon
  res.json(data)
}

module.exports = {
  getUserCourseOrders,
  getUserCourseOrderDetails,
  courseOrderDetails,
  courseOrderPay,
  getUserProductOrders,
  getUserProductOrderDetails,
  productOrderDetails,
  productOrderPay,
  getUserCoupons,
  updateUserCourseComment,
  updateUserProductComment,
}
