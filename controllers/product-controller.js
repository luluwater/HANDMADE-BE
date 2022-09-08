const pool = require('../configs/mysql')

//RESful API

const getProductList = async (req, res) => {
  const data = await pool.execute(
    `SELECT product.id, product.name, category.category_name,category.category_en_name, store.name AS store_name, price FROM product 
    JOIN store ON product.store_id = store.id  
    JOIN category ON category.id = product.category_id
    `
  )
  const imgs = await pool.execute(`SELECT * FROM product_img`)
  //TODO:參數改session
  const favorite = await getFavoriteProduct(1)

  const response = data[0].map((v) => {
    // const newimgs = []
    const newImgs = imgs[0].filter((v2) => v2.product_id === v.id)
    const newImagsName = newImgs.map((v2) => v2.img_name)
    const isFavorite = favorite.find((v2) => v2.product_id === v.id)
    // console.log(newImagsName)
    // for (let img of imgs[0]) {
    //   if (v.id === img.product_id) newimgs.push(img.img_name)
    // }
    // console.log(isFavorite)
    v['img_name'] = newImagsName
    v['isFavorite'] = isFavorite ? true : false
    return v
  })

  console.log(response)
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
  const result = await getFavoriteProduct(1)
  res.json(result)
}

const addFavoriteProductTable = async (req, res) => {
  //TODO: 參數更改session
  console.log(req.body)

  await addFavoriteProduct(1, req.body.productId)
  res.json({ message: '加入最愛' })
}

const removeFavoriteProductTable = async (req, res) => {
  //TODO: 參數更改session
  await removeFavoriteProduct(1, req.body.productId)
  res.json({ message: '移出最愛' })
}

async function addFavoriteProduct(userId, productId) {
  let [result] = await pool.execute('INSERT INTO user_favorite_product (user_id, product_id) VALUES (?, ?)', [userId, productId])
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

const getProductDetail = async (req, res) => {
  const productId = req.params.productId
  const [product] = await pool.execute(
    `SELECT product.id, product.name, product.intro, product.price, product.amount, store.name AS store_name FROM product 
  JOIN store ON product.store_id = store.id WHERE product.id =? `,
    [productId]
  )
  const [imgs] = await pool.execute(`SELECT * FROM product_img`)

  const response = product.map((v) => {
    const newImgs = imgs.filter((v2) => v2.product_id === v.id)
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
}
