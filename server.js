require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const pug = require('pug')

const app = express()
const chatRouter = require('./routes/chat-router')
const blogRouter = require('./routes/blog-router')
const commentRouter = require('./routes/comment-router')
const replyRouter = require('./routes/reply-router')
const productRouter = require('./routes/product-router')
const courseRouter = require('./routes/course-router')
const storeRouter = require('./routes/store-router')
const userRouter = require('./routes/user-router')
const googleRouter = require('./routes/google-router')
const filterRouter = require('./routes/filter-router')
const SocketServer = require('./configs/socket')
const categoryRouter = require('./routes/category-router')
const http = require('http')

const authRouter = require('./routes/auth-router')
const orderRouter = require('./routes/order-router')
const couponRouter = require('./routes/coupon-router')

const PORT = process.env.PORT || 8080

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000'],
}

app.use(express.json())

app.set('view engine', 'pug')
app.set('./', 'views')

const expressSession = require('express-session')
var FileStore = require('session-file-store')(expressSession)

app.use(
  expressSession({
    store: new FileStore({
      path: path.join(__dirname, 'sessions'),
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
)

const server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/chat', chatRouter)
app.use('/api/blog', blogRouter)
app.use('/api/comment', commentRouter)
app.use('/api/reply', replyRouter)
app.use('/api/product', productRouter)
app.use('/api/course', courseRouter)
app.use('/api/store', storeRouter)
app.use('/api/user', userRouter)
app.use('/api/google', googleRouter)
app.use('/api/filter', filterRouter)
SocketServer(server)
app.use('/api/category', categoryRouter)
app.use('/api/auth', authRouter)
app.use('/api/order', orderRouter)
app.use('/api/coupon', couponRouter)

app.get('/', (req, res) => {
  res.send('homepage')
})

const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { authorize } = require('./configs/googleAuth')

app.post('/api/google/orderConfirmation', async (req, res) => {
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

  console.log('req.bodyreq.body', req.body)

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

    const mailOptions = {
      ...mailoptions,
    }

    mailOptions.html = await pug.renderFile(__dirname + '/views' + '/orderConfirm.pug', { orderNumber, order_detail, create_time, total_amount })

    const result = await transport.sendMail(mailOptions)

    res.send(result)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

server.listen(PORT, () => {
  console.log(`node Server is running on http://localhost:${PORT}`)
})
