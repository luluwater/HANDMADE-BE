const nodemailer = require('nodemailer')
const { google } = require('googleapis')
require('dotenv').config()
const { authorize } = require('../configs/googleAuth')


/**
 * 
 * TODO: 傳送 email 需要知道該 auth(我們在 console 裡面選擇的測試 email angus648那個) 大專改成測試的 EMAIL 帳號
 */
//GET http://localhost:8080/api/google/sendmail
const sendMail = async (req, res) => {

  const authRefreshData = await authorize()
  const clientId = authRefreshData._clientId
  const clientSecret = authRefreshData._clientSecret
  const refreshToken = authRefreshData.credentials.refresh_token

  /**
   * 用拿到的 cliend_id 和 client_secret來建立一個新的 OAuth2
   */
  const oAuth2Client = new google.auth.OAuth2( clientId, clientSecret)

  /**
   * 並在建立的 oAuth 中設置他的 Credentials，裡面要放入 refresh token
   */
  oAuth2Client.setCredentials({
    refresh_token: refreshToken,
  })


  const auth = {
    type: 'OAuth2',
    user: 'angusapril648@gmail.com',
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken,
  }


  //TODO:把 GMAIL 和內容放在這
  const mailoptions = {
    from: 'Siddhant &lt;sickmi14798@gmail.com>',
    to: 'angusapril648@gmail.com',
    subject: 'Gmail API NodeJS Success happy!',
  }

   try {
    const accessToken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        ...auth,
        accessToken: accessToken,
      },
    })

    /**
     * ! 內容寫在 text 裡面
     * TODO: 從前端送來的 req.body 的 context 放到這裡面來
     */
    const mailOptions = {
      ...mailoptions,
      text: 'The Gmail API with NodeJS works 成功成功了好爽歐',
    }

    const result = await transport.sendMail(mailOptions)
    console.log('Success send the mail')
    res.send(result)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
  
}





module.exports = {
  sendMail
}
