const pool = require('../configs/mysql')

//RESful API

const getProductList = async (req, res) => {
  const data = await pool.execute(
    `SELECT product.id, product.name,product.amount,product.store_id,product.category_id, category.category_name,category.category_en_name, store.name AS store_name, price,sold_amount FROM product 
    JOIN store ON product.store_id = store.id  
    JOIN category ON category.id = product.category_id
    WHERE isDelete = 0
    `
  )
  const imgs = await pool.execute(`SELECT * FROM product_img`)
  //TODO:參數改session
  const userId = req.query.userId
  // console.log(userId)
  const favorite = userId !== 'undefined' ? await getFavoriteProduct(userId) : []

  const response = data[0].map((v) => {
    // const newimgs = []
    const newImgs = imgs[0].filter((v2) => v2.product_id === v.id)
    const newImagsName = newImgs.map((v2) => v2.img_name)
    const isFavorite = favorite.find((v2) => v2.product_id === v.id)
    // for (let img of imgs[0]) {
    //   if (v.id === img.product_id) newimgs.push(img.img_name)
    // }
    // console.log(isFavorite)
    v['img_name'] = newImagsName
    v['isFavorite'] = isFavorite ? true : false
    return v
  })

  // console.log(response)
  res.json(response)
}

const getStoreProduct = async (req, res) => {
  const storeId = req.params.storeId
  const [data] = await pool.execute(
    `SELECT product.id, product.store_id, product.name, product.price, category.category_en_name, store.name AS store_name FROM product 
    JOIN store ON product.store_id = store.id  
    JOIN category ON category.id = product.category_id WHERE store_id = ?
    `,
    [storeId]
  )
  const [imgs] = await pool.execute(`SELECT product_img.* ,product.store_id FROM product_img JOIN product ON product.id = product_img.product_id`)

  const response = data.map((v) => {
    const newImgs = imgs.filter((v2) => v2.product_id === v.id)
    const newImagsName = newImgs.map((v2) => v2.img_name)

    v['imgName'] = newImagsName
    return v
  })

  res.json(response)
}

const getFavoriteProductList = async (req, res) => {
  //TODO: 參數更改session
  if (req.query.userId === 'undefined') return res.json('未登入')

  const result = await getFavoriteProduct(req.query.user.id)
  res.json(result)
}

const addFavoriteProductTable = async (req, res) => {
  //TODO: 參數更改session
  console.log(req.body)
  if (req.query.userId === 'undefined') return res.json('未登入')

  await addFavoriteProduct(req.query.userId, req.body.productId, req.body.storeId, req.body.categoryId)
  res.json({ message: '加入最愛' })
}

const removeFavoriteProductTable = async (req, res) => {
  //TODO: 參數更改session
  if (!req.query.userId === 'undefined') return res.json('未登入')
  await removeFavoriteProduct(req.query.userId, req.body.productId)
  res.json({ message: '移出最愛' })
}

async function addFavoriteProduct(userId, productId, storeId, categoryId) {
  let [result] = await pool.execute('INSERT INTO user_favorite_product (user_id, product_id,store_id,category_id) VALUES (?, ?, ?, ?)', [userId, productId, storeId, categoryId])
  console.log('addFavoriteProduct', result)
}

async function getFavoriteProduct(userId) {
  let [result] = await pool.execute('SELECT * FROM user_favorite_product WHERE user_id = ?', [userId])
  return result
}

async function removeFavoriteProduct(userId, productId) {
  let [result] = await pool.execute('DELETE FROM user_favorite_product WHERE user_id = ? AND product_id = ?', [userId, productId])
  console.log('removeFavoriteProduct', result)
}

////////// Product Detail //////////
const getProductDetail = async (req, res) => {
  // console.log('test', req)
  const productId = req.params.productId
  const [product] = await pool.execute(
    `SELECT product.id, product.category_id, product.name, product.amount, product.intro, product.price, product.amount, product.store_id, category.category_en_name, store.name AS store_name FROM product 
    JOIN category ON category.id = product.category_id
    JOIN store ON product.store_id = store.id WHERE product.id =? `,
    [productId]
  )
  const userId = req.query.userId
  const [imgs] = await pool.execute(`SELECT * FROM product_img`)
  // const favorite = await getFavoriteProduct(1)
  // console.log(userId)
  const favorite = userId ? await getFavoriteProduct(userId) : []

  const response = product.map((v) => {
    const newImgs = imgs.filter((v2) => v2.product_id === v.id)
    const newImagsName = newImgs.map((v2) => v2.img_name)
    const isFavorite = favorite.find((v2) => v2.product_id === v.id)

    v['img_name'] = newImagsName
    v['isFavorite'] = isFavorite ? true : false

    return v
  })
  res.json(response)
}

////////// Product Comment //////////
const getProductComment = async (req, res) => {
  const productCommentId = req.params.productCommentId
  const [productComment] = await pool.execute(
    `SELECT product_comment.*, user.avatar, user.name AS user_name FROM product_comment
  JOIN user ON product_comment.user_id = user.id WHERE product_id = ?`,
    [productCommentId]
  )
  const [imgs] = await pool.execute(`SELECT * FROM product_comment_img`)

  const response = productComment.map((v) => {
    const newImgs = imgs.filter((v2) => v2.id === v.product_comment_img_id)
    const newImagsName = newImgs.map((v2) => v2.img_name)
    v['img_name'] = newImagsName
    return v
  })
  res.json(response)
}

module.exports = {
  getProductList,
  getStoreProduct,
  addFavoriteProductTable,
  getFavoriteProductList,
  removeFavoriteProductTable,
  getProductDetail,
  getProductComment,
}
