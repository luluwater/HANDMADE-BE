const pool = require('../configs/mysql')

const getUserProductsOrders = async (req, res) => {
  const [data] = await pool.execute('SELECT product_order.*, product_order.id AS product_order_id FROM product_order JOIN user ON product_order.user_id = user.id WHERE product_order.user_id = 1 ORDER BY product_order.create_time DESC')
  res.json(data)
}

const getUserCoursesOrders = async (req, res) => {
    const [data] = await pool.execute('SELECT course_order .*,course_order.id AS course_order_id FROM course_order JOIN user ON course_order.user_id = user.id WHERE course_order.user_id = 1 ORDER BY course_order.create_time DESC')
    res.json(data)
  }

module.exports = { getUserProductsOrders, getUserCoursesOrders }

// SELECT product_order.*, product_order.id AS product_order_id FROM product_order JOIN user ON product_order.user_id = user.id 

//WHERE product_order.user_id = 1 
//ORDER BY product_order.create_time DESC

//SELECT course_order .*,course_order.id AS course_order_id FROM course_order JOIN user ON course_order.user_id = user.id WHERE course_order.user_id = 1 ORDER BY course_order.create_time DESC

//
