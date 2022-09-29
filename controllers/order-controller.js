const pool = require('../configs/mysql')

// ==================== product order ====================

const createProductOrder = async (req, res) => {
  const { id, orderNumber, user_id, coupon_id, create_time, name, phone, delivery_id, payment_id, address, note, total_amount, payment_state_id, order_state_id } = req.body

  await pool.execute(
    `INSERT IGNORE INTO product_order (id,order_number,user_id,coupon_id,create_time,payment_id,delivery_id,total_amount,payment_state_id,order_state_id,address,phone,name,note,valid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [id, orderNumber, user_id, coupon_id, create_time, payment_id, delivery_id, total_amount, payment_state_id, order_state_id, address, phone, name, note, 1]
  )
  console.log('success submit productOrder')
  res.send('success')
}

const createProductOrderDetail = async (req, res) => {
  console.log('createProductOrderDetail')

  const { id, order_detail } = req.body

  for (let i = 0; i < order_detail.length; i++) {
    await pool.execute(`INSERT IGNORE INTO product_order_list(order_id,product_id,amount,total_amount,price) VALUES(?,?,?,?,?)`, [
      id,
      order_detail[i].productId,
      order_detail[i].quantity,
      order_detail[i].totalPrice,
      order_detail[i].price,
    ])
  }
  console.log('success submit productOrder')
  res.send('success')
}

const getProductOrder = async (req, res) => {
  const orderId = req.params.orderId

  const [data] = await pool.execute(
    `SELECT product_order.id, product_order.order_number,product_order.create_time,product_order.payment_id,product_order.total_amount,coupon.coupon_discount,coupon.discount_type_id ,payment.name AS payment_name FROM product_order JOIN coupon ON product_order.coupon_id = coupon.id
    JOIN payment ON product_order.payment_id = payment.id WHERE product_order.id =?`,
    [orderId]
  )

  const [dataDetail] = await pool.execute(
    `SELECT product_order_list.order_id, product_order_list.product_id,product_order_list.amount,product_order_list.price,product.name FROM product_order_list JOIN product ON product_order_list.product_id = product.id WHERE product_order_list.order_id =?`,
    [orderId]
  )

  const response = data.map((v) => {
    v['orderDetail'] = dataDetail
    return v
  })

  res.json(response)
}

// ==================== course order ====================

const createCourseOrder = async (req, res) => {
  const { id, orderNumber, user_id, coupon_id, create_time, payment_id, total_amount, order_state_id, name, phone, email, note } = req.body

  await pool.execute(
    `INSERT IGNORE INTO course_order (id, order_number, user_id, coupon_id, create_time, payment_id, total_amount, order_state_id, name, phone, email, note,valid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [id, orderNumber, user_id, coupon_id, create_time, payment_id, total_amount, order_state_id, name, phone, email, note, 1]
  )
  console.log('success submit CourseOrder')
  res.send('success')
}

const createCourseOrderDetail = async (req, res) => {
  const { id, order_detail, total_amount } = req.body

  for (let i = 0; i < order_detail.length; i++) {
    await pool.execute(`INSERT IGNORE INTO course_order_list(order_id,course_id,course_stock_id,amount,total_amount,price,date) VALUES(?,?,?,?,?,?,?)`, [
      id,
      order_detail[i].id,
      order_detail[i].stockId,
      order_detail[i].quantity,
      total_amount,
      order_detail[i].price,
      `${order_detail[i].date} ${order_detail[i].time}`,
    ])
  }
  console.log('success submit courseOrderDetail')
  res.send('success')
}

const getCourseOrder = async (req, res) => {
  const orderId = req.params.orderId

  const [data] = await pool.execute(
    `SELECT course_order.id,course_order.order_number, course_order.create_time, course_order.payment_id, course_order.total_amount, course_order.email,coupon.coupon_discount,coupon.discount_type_id , payment.name AS payment_name FROM course_order JOIN payment ON course_order.payment_id = payment.id JOIN coupon ON course_order.coupon_id = coupon.id WHERE course_order.id = ?`,
    [orderId]
  )

  const [dataDetail] = await pool.execute(
    `SELECT
  course_order_list.course_id,course_order_list.course_stock_id,course_order_list.amount,course_order_list.total_amount,course_order_list.price,course_order.order_number,
  course.name,course.note,course_stock.time_start,course_stock.time_end,course_stock.date,store.address,category.category_name FROM course_order_list JOIN course_order ON course_order.id = course_order_list.order_id JOIN course ON course_order_list.course_id = course.id JOIN course_stock ON course_order_list.course_stock_id = course_stock.id JOIN store ON course.store_id = store.id JOIN category ON category.id = course.category_id WHERE course_order_list.order_id =?`,
    [orderId]
  )

  const response = data.map((v) => {
    v['orderDetail'] = dataDetail
    return v
  })

  res.json(response)
}

module.exports = { createProductOrder, createProductOrderDetail, getProductOrder, createCourseOrder, createCourseOrderDetail, getCourseOrder }
