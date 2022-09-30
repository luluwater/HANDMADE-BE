const { default: axios } = require('axios')
require('dotenv').config()

const payByPrime = async (req, res, next) => {
  if (req.body.payment_id !== 2) next()

  const partner_key = process.env.PAYMENT_PARNER_KEY
  const merchant_id = process.env.MERCHANT_ID

  const post_data = {
    prime: req.body.prime,
    partner_key: partner_key,
    merchant_id: merchant_id,
    details: req.body.details,
    amount: req.body.total_amount,
    cardholder: {
      phone_number: req.body.phone,
      name: req.body.name,
      email: req.body.email,
    },
  }

  axios
    .post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', post_data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': partner_key,
      },
    })
    .then((response) => {
      console.log('susses', response.data)
      return res.json({
        result: response.data,
      })
    })
    .catch(() => console.error())
}

module.exports = { payByPrime }
