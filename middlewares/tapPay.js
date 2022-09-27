const { default: axios } = require('axios')
require('dotenv').config()

const payByPrime = async (req, res) => {
  const partner_key = process.env.PAYMENT_PARNER_KEY
  const merchant_id = process.env.MERCHANT_ID

  const post_data = {
    prime: req.body.prime,
    partner_key: partner_key,
    merchant_id: merchant_id,
    details: req.body.details,
    amount: req.body.amount,
    cardholder: {
      phone_number: req.body.cardholder.phone_number,
      name: req.body.cardholder.name,
      email: req.body.cardholder.email,
    },
    remember: true,
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
