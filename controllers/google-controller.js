const nodemailer = require('nodemailer')
const { google } = require('googleapis')
require('dotenv').config()

/**
 * 用拿到的 cliend_id 和 client_secret來建立一個新的 OAuth2
 */
const oAuth2Client = new google.auth.OAuth2('1086238500382-h5o060c5dl77q244fm2ajhr5rrf7ucp4.apps.googleusercontent.com', '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')

/**
 * 並在建立的 oAuth 中設置他的 Credentials，裡面要放入 refresh token
 */
oAuth2Client.setCredentials({
  refresh_token: '1//0er2OEMxyNVx1CgYIARAAGA4SNwF-L9Irt-r23Ebwdu2qrbUDn20Eolut-1mwQEsKjYZsDk7ThXktILS4e6Hugl4AcifCU85o4Tk',
})


const auth = {
  type: 'OAuth2',
  user: 'angusapril648@gmail.com',
  clientId: '1086238500382-h5o060c5dl77q244fm2ajhr5rrf7ucp4.apps.googleusercontent.com',
  clientSecret: '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',
  refreshToken: '1//0er2OEMxyNVx1CgYIARAAGA4SNwF-L9Irt-r23Ebwdu2qrbUDn20Eolut-1mwQEsKjYZsDk7ThXktILS4e6Hugl4AcifCU85o4Tk',
}


/**
 * 下面有各種對 gmail 操作的方法
 * TODO: 傳送 email 需要知道該 auth(我們在 console 裡面選擇的測試 email angus648那個) 大專改成測試的 EMAIL 帳號
 */
const sendMail = async (req, res) => {

  //TODO:把 GMAIL 和內容放在這
  const mailoptions = {
    from: 'Siddhant &lt;angusapril648@gmail.com>',
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
    res.send(result)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}





module.exports = {
  sendMail
}
