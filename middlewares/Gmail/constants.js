/**
 * 送出訊息的內容
 *
 */
const auth = {
  type: 'OAuth2',
  user: 'angusapril648@gmail.com',
  clientId: '',
  clientSecret: '',
  refreshToken: '',
}

const mailoptions = {
  from: 'Siddhant &lt;angusapril648@gmail.com>',
  to: 'angusapril648@gmail.com',
  subject: 'Gmail API NodeJS Success happy!',
}
module.exports = { auth, mailoptions }
