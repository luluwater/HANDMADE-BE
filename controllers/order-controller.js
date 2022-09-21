const pool = require('../configs/mysql')

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

module.exports = { createProductOrder, createProductOrderDetail, getProductOrder }

// `SELECT product_order.id, product_order.order_number,product_order.create_time,product_order.payment_id,product_order.total_amount,product_order_list.product_id,product_order_list.amount,product_order_list.price,coupon.coupon_discount,coupon.discount_type_id ,product.name,payment.name AS payment_name FROM product_order JOIN product_order_list ON product_order_list.order_id = product_order.id JOIN coupon ON product_order.coupon_id = coupon.id
// JOIN product ON product_order_list.product_id = product.id JOIN payment ON product_order.payment_id = payment.id WHERE product_order.id =?`,
// [orderId]
