/**
 * 送出訊息的內容
 *
 */
const auth = {
  type: 'OAuth2',
  user: 'angusapril648@gmail.com',
  clientId:
    '526215990556-gbgmt6b54f8qqu6g7p3i73fckqi7scsm.apps.googleusercontent.com',
  clientSecret: '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',
  refreshToken:
    '1//0eynkwkDNRIRICgYIARAAGA4SNwF-L9IrWKHHvJzbPvyjPIkHfAEJOi1FccA1LAXAgroBVW_s7Txun6muDjShPtJoX7g2Ti_qzGs',
}

const mailoptions = {
  from: 'Siddhant &lt;angusapril648@gmail.com>',
  to: 'angusapril648@gmail.com',
  subject: 'Gmail API NodeJS Success happy!',
}
module.exports = { auth, mailoptions }
