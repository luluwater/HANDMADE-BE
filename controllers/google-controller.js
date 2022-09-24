const nodemailer = require('nodemailer')
const { google } = require('googleapis')
require('dotenv').config()
const { authorize } = require('../configs/googleAuth')
const pug = require('pug')

const auth = async () => {
  await authorize()
}

//POST http://localhost:8080/api/google/calendar
const addToSchedule = async (req, res) => {
  const authRefreshData = await authorize()
  const clientId = authRefreshData._clientId
  const clientSecret = authRefreshData._clientSecret
  const refreshToken = authRefreshData.credentials.refresh_token

  const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret)

  oAuth2Client.setCredentials({
    refresh_token: refreshToken,
  })

  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

  const { name, address, note, date, time_start, time_end } = req.body
  let event = {
    summary: name,
    location: address,
    description: note,
    start: {
      dateTime: `${date}T${time_start}:00`,
      timeZone: 'Asia/Taipei',
    },
    end: {
      dateTime: `${date}T${time_end}:00`,
      timeZone: 'Asia/Taipei',
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 3 },
        { method: 'popup', minutes: 10 },
      ],
    },

    colorId: 4,
  }

  await calendar.freebusy.query(
    {
      resource: {
        timeMin: '2022-09-11T09:00:00-07:00',
        timeMax: '2022-09-17T17:00:00-07:00',
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
  res.send('done')
}

//TODO:訂單確認信內容塞入訂單編號
//POST http://localhost:8080/api/google/orderConfirmation
const orderConfirmation = async (req, res) => {
  const authRefreshData = await authorize()
  const clientId = authRefreshData._clientId
  const clientSecret = authRefreshData._clientSecret
  const refreshToken = authRefreshData.credentials.refresh_token
  const redirect = authRefreshData.redirectUri
  const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirect)

  oAuth2Client.setCredentials({
    refresh_token: refreshToken,
  })

  const { orderNumber, order_detail, create_time, total_amount } = req.body

  console.log(orderNumber, order_detail, create_time, total_amount)

  const auth = {
    type: 'OAuth2',
    user: 'carzydarkcat@gmail.com',
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken,
  }

  const mailoptions = {
    from: 'Siddhant &lt;<angusapril648@gmail.com>',
    to: 'carzydarkcat@gmail.com',
    subject: '訂單成立',
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

    // const mailOptions = {
    //   ...mailoptions,
    // }
    mailoptions.html = pug.renderFile(__dirname + '..', '/view/layout.pug', { text: '手手' })

    // mailOptions.html = pug.renderFile(__dirname + '/views/mail_template.pug', { text: '狗王' })

    //TODO: html:裡面寫從前端送來的 req.body 的 context 放到這裡面來
    const result = await transport.sendMail(mailoptions)
    console.log('Success send the mail')
    res.send(result)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}

//POST http://localhost:8080/api/google/validationMail
const sendValidationMail = async (req, res) => {
  const authRefreshData = await authorize()
  const clientId = authRefreshData._clientId
  const clientSecret = authRefreshData._clientSecret
  const refreshToken = authRefreshData.credentials.refresh_token
  const redirect = authRefreshData.redirectUri

  const { mail } = req.body

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
    user: mail,
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken,
  }

  //TODO:把 GMAIL 和內容放在這
  const mailoptions = {
    from: 'Siddhant &lt;<angusapril648@gmail.com>',
    to: mail,
    subject: '【HANDMADE 手手】 "更換密碼通知驗證信"',
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
      html: `<br>親愛的會員您好，</br>
      <b>手手 Handmade</b> 於今日收到您提出「忘記密碼」之需求，請您點擊以下連結重新設定登入密碼</h4>
      <h2><a onMouseOver="this.style.color='#E77656'" onMouseOut="this.style.color='#779CB2'" href="http://localhost:3000/ResetPassword/${mail}" style="color:#779CB2; text-decoration:none;">點此登入</a></h2>
      <p>如非您本人提出需求，請盡速洽詢客服專線</br>
      若有任何問題，歡迎透過以下方式與我們聯絡，謝謝！</p>
      <li style="list-style-type: square;">Email: service@handmade.com</li>
      <li style="list-style-type: square;">phone: 03-4567899</li>`,
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
  orderConfirmation,
  auth,
  sendValidationMail,
  addToSchedule,
}

// : `<h1>您的訂單已完成，謝謝您的訂購！</h1>
//       <b style="color: #e77656">
//         此信件為重要信件，交易完成前請保留此信件以利查詢。
//       </b>
//       <h3>訂單編號 &nbsp; #221012088</h3>
//       <h4>訂單成立時間 &nbsp; 2022-09-24 </h4>
//       <table style="width: 40%; border: 1px solid #5f5c51; padding: 20px">
//         <tbody>
//           <tr>
//             <td style="width: 15%">商品類別</td>
//             <td style="width: 25%">商品名稱</td>
//             <td style="width: 15%">數量</td>
//             <td style="width: 15%">小計</td>
//             <td style="width: 30%">備註</td>
//           </tr>
//           <tr>
//             <td style="width: 15%">課程</td>
//             <td style="width: 25%">陶盤進階手捏課程</td>
//             <td style="width: 15%">2</td>
//             <td style="width: 15%">2480</td>
//             <td style="width: 30%">2022/10/18 13:00</td>
//           </tr>
//           <tr>
//             <td style="width: 15%">課程</td>
//             <td style="width: 25%">手綁鬱金香花束</td>
//             <td style="width: 15%">1</td>
//             <td style="width: 15%">2880</td>
//             <td style="width: 30%">2022/10/08 10:00</td>
//           </tr>
//         </tbody>
//       </table>
//       <h4>總金額 &nbsp; NT.5360</h4>
//       <p>
//         本郵件由系統自動產生與發送，請勿直接回覆。<br />
//         如欲查詢訂單狀況，請至「手手 Handmade」<b style="color: #e77656"
//           >會員中心 > 訂單管理</b
//         >
//         &nbsp;查看。
//       </p>`
