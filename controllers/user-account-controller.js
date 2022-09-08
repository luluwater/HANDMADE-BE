const pool = require('../configs/mysql')

//TODO: session
const getUserAccount = async (req, res) => {
  const [data] = await pool.execute('SELECT * FROM user WHERE user.id = 1')
  res.json(data)
}
//TODO: update
// const updateUserAccount = async (req, res) => {
//   const {password, name,  phone, birthday, address} = req.body
//   await pool.execute(`UPDATE user SET (password, name,  phone, birthday, address) VALUES (?, ?, ?, ?, ?), [password, name,  phone, birthday, address] WHERE user.id = 1`)

// res.send('success update')
//WHERE user.id = 1
// module.exports = {  getUserAccount, updateUserAccount }

//TODO: avatar update
module.exports = { getUserAccount }
