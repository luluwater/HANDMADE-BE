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

module.exports = {
  getProductList,
}
