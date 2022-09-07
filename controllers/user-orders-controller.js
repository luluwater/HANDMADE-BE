const pool = require('../configs/mysql')

const getUserProductOrders = async (req, res) => {
  const [dataProduct] = await pool.execute(
    'SELECT product_order.*, product_order.create_time AS product_order_create_time, product_order.order_number AS product_order_order_number, product_order.order_state_id AS product_order_order_state_id, product_order.name AS product_order_name, payment.name AS payment_name, order_staus.name AS order_staus_name FROM product_order JOIN order_staus ON product_order.order_state_id = order_staus.id JOIN payment ON product_order.payment_id = payment.id JOIN user ON product_order.user_id = user.id JOIN product_order_list ON product_order.id = order_id WHERE product_order.user_id = 1'
  )
  res.json(dataProduct)
}

module.exports = { getUserProductOrders }
