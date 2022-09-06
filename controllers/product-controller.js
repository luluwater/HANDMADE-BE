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
  const response = data[0].map((v) => {
    // const newimgs = []
    const newImgs = imgs[0].filter((v2) => v2.product_id === v.id)
    const newImagsName = newImgs.map((v2) => v2.img_name)
    // console.log(newImagsName)
    // for (let img of imgs[0]) {
    //   if (v.id === img.product_id) newimgs.push(img.img_name)
    // }

    v['img_name'] = newImagsName
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
    `,[storeId]
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

module.exports = {
  getProductList,
  getStoreProduct,
}
