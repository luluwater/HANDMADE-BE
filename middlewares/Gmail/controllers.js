/**
 * 取出生成的 token 檔案中的
 * 1. Client_id
 * 2. client_secret
 * 3. refresh_token
 */

const axios = require('axios')
const { generateConfig } = require('./utils')
const nodemailer = require('nodemailer')
const CONSTANTS = require('./constants')
const { google } = require('googleapis')

require('dotenv').config()

/**
 * 用拿到的 cliend_id 和 client_secret來建立一個新的 OAuth2
 */
const oAuth2Client = new google.auth.OAuth2(
  '526215990556-gbgmt6b54f8qqu6g7p3i73fckqi7scsm.apps.googleusercontent.com',
  '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',
  'http://localhost:8080/auth/google/redirect'
)

/**
 * 並在建立的 oAuth 中設置他的 Credentials，裡面要放入 refresh token
 */
oAuth2Client.setCredentials({
  refresh_token:
    '1//0eynkwkDNRIRICgYIARAAGA4SNwF-L9IrWKHHvJzbPvyjPIkHfAEJOi1FccA1LAXAgroBVW_s7Txun6muDjShPtJoX7g2Ti_qzGs',
})

/**
 * 下面有各種對 gmail 操作的方法
 * TODO: 傳送 email 需要知道該 auth(我們在 console 裡面選擇的測試 email angus648那個) 大專改成測試的 EMAIL 帳號
 */
async function sendMail(req, res) {
  try {
    const accessToken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        ...CONSTANTS.auth,
        accessToken: accessToken,
      },
    })

    /**
     * ! 內容寫在 text 裡面
     * TODO: 從前端送來的 req.body 的 context 放到這裡面來
     */
    const mailOptions = {
      ...CONSTANTS.mailoptions,
      text: 'The Gmail API with NodeJS works 成功成功了好爽歐',
    }

    const result = await transport.sendMail(mailOptions)
    res.send(result)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}
///////////////send//////////////////////////////

// !!下面大專應該不會用到，所以 generateConfig 應該不用寫
async function getUser(req, res) {
  try {
    console.log(req.params.email)
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`
    const { token } = await oAuth2Client.getAccessToken()
    const config = generateConfig(url, token)
    const response = await axios(config)
    res.json(response.data)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}

async function getDrafts(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`
    const { token } = await oAuth2Client.getAccessToken()
    const config = generateConfig(url, token)
    const response = await axios(config)
    res.json(response.data)
  } catch (error) {
    console.log(error)
    return error
  }
}

async function readMail(req, res) {
  try {
    const url = `https://gmail.googleapis.com//gmail/v1/users/angusapril648@gmail.com/messages/${req.params.messageId}`
    const { token } = await oAuth2Client.getAccessToken()
    const config = generateConfig(url, token)
    const response = await axios(config)

    let data = await response.data

    res.json(data)
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  getUser,
  sendMail,
  getDrafts,
  //   searchMail,
  readMail,
}
