const nodemailer = require('nodemailer')
const { google } = require('googleapis')
require('dotenv').config()
const { authorize } = require('../configs/googleAuth')

const auth = async () => {
  await authorize()
}

let event = {
  summary: '今天是星期四!',
  location: '台北市中山區遼寧街19巷23號',
  description:
    '台北市中山區遼寧街19巷23號台北市中山區遼寧街19巷23號台北市中山區遼寧街19巷23號台北市中山區遼寧街19巷23號台北市中山區遼寧街19巷23號台北市中山區遼寧街19巷23號台北市中山區遼寧街19巷23號台北市中山區遼寧街19巷23號',
  start: {
    dateTime: '2022-09-11T05:40:00',
    timeZone: 'Asia/Taipei',
  },
  end: {
    dateTime: '2022-09-012T06:00:00',
    timeZone: 'Asia/Taipei',
  },
  reminders: {
    useDefault: false,
    overrides: [
      { method: 'email', minutes: 3 },
      { method: 'popup', minutes: 10 },
    ],
  },

  colorId: 2,
}

//TODO: 插不進去喇
//!0908 目前是 enjoy project 的 網路用戶端 3
const addToSchedule = async (req, res) => {
  const authRefreshData = await authorize()
  const clientId = authRefreshData._clientId
  const clientSecret = authRefreshData._clientSecret
  const refreshToken = authRefreshData.credentials.refresh_token
  console.log('clientId', clientId)
  console.log('clientSecret', clientSecret)
  console.log('refreshToken', refreshToken)

  const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret)

  oAuth2Client.setCredentials({
    refresh_token: refreshToken,
  })

  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

  await calendar.freebusy.query(
    {
      resource: {
        timeMin: '2022-09-01T09:00:00-07:00',
        timeMax: '2022-09-30T17:00:00-07:00',
        timeZone: 'Asia/Taipei',
        items: [{ id: 'primary' }],
      },
    },
    (err, res) => {
      if (err) return console.error('Free Busy Error', err)
      const eventArr = res.data.calendars.primary.busy
      if (eventArr.length === 0)
        return calendar.events.insert({ calendarId: 'primary', resource: event }, (err) => {
          if (err) return console.error('calendar Event creation error', err)
          console.log('calendar', calendar)
          return console.error('calendar event created')
        })
      return console.log(`Sorry I'm Busy`)
    }
  )
  res.send('success')
}

/**
 * TODO: 傳送 email 需要知道該 auth(我們在 console 裡面選擇的測試 email angus648那個) 大專改成測試的 EMAIL 帳號
 */
//GET http://localhost:8080/api/google/sendmail
const sendMail = async (req, res) => {
  const authRefreshData = await authorize()
  const clientId = authRefreshData._clientId
  const clientSecret = authRefreshData._clientSecret
  const refreshToken = authRefreshData.credentials.refresh_token
  const redirect = authRefreshData.redirectUri

  /**
   * 用拿到的 cliend_id 和 client_secret來建立一個新的 OAuth2
   */
  const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirect)

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
  sendMail,
  auth,
  addToSchedule,
}
