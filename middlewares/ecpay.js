// const ecpay_payment = require('../node_modules/ecpay_aio_nodejs/lib/ecpay_payment')
// const options = require('../node_modules/ecpay_aio_nodejs/conf/config-example')

// const ecpay = async (req, res) => {
//   const { id, orderNumber, user_id, coupon_id, create_time, name, phone, delivery_id, payment_id, address, note, total_amount, payment_state_id, order_state_id } = req.body

//   // console.log('req.body in ecpay md', req.body)

//   let base_param = {
//     MerchantTradeNo: uuid,
//     MerchantTradeDate: onTimeValue(),
//     TotalAmount: total_amount,
//     TradeDesc: '測試交易描述',
//     ItemName: '測試商品等',
//     OrderResultURL: `http://localhost:3000/course_checkout/${id}`,
//     ReturnURL: 'http://192.168.0.1',
//   }
//   let inv_params = {}

//   if (payment_id == 2) {
//     let create = new ecpay_payment(options)

//     console.log('create', create)
//     // let htm = create.payment_client.aio_check_out_credit_onetime((params = base_param), (invoice = inv_params))
//     // res.status(200).json({ result: htm })
//   }
// }

// // 以當前時間毫秒數, 產生隨機的 20 碼 UUID
// const uuid = () => {
//   let d = Date.now()
//   if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
//     d += performance.now() //use high-precision timer if available
//   }
//   return 'xxxxxxxxxxxx4xxxyxxx'.replace(/[xy]/g, function (c) {
//     let r = (d + Math.random() * 16) % 16 | 0
//     d = Math.floor(d / 16)
//     return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
//   })
// }

// // 將當前日期組成 YYYY/MM/DD HH:MM:SS 格式
// const onTimeValue = function () {
//   var date = new Date()
//   var mm = date.getMonth() + 1
//   var dd = date.getDate()
//   var hh = date.getHours()
//   var mi = date.getMinutes()
//   var ss = date.getSeconds()

//   return [
//     date.getFullYear(),
//     '/' + (mm > 9 ? '' : '0') + mm,
//     '/' + (dd > 9 ? '' : '0') + dd,
//     ' ' + (hh > 9 ? '' : '0') + hh,
//     ':' + (mi > 9 ? '' : '0') + mi,
//     ':' + (ss > 9 ? '' : '0') + ss,
//   ].join('')
// }

// module.exports = { ecpay }
