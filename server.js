const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')

const chatRouter = require('./routes/chat-router')
const blogRouter = require('./routes/blog-router')

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * imgae
 */
const pool = require('./configs/mysql')
const router = require('express').Router()

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split('.')
    ext = ext[ext.length - 1]
    //用日期來給檔案名稱
    cb(null, `${Date.now()}.${ext}`)
  },
})
const upload = multer({ storage })
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}
app.use([express.static('public'), express.json(), cors(corsOptions), upload.array('files')])
app.post('/upload_files', (req, res) => {
  if (req.files.length > 0) {
    res.json(req.files[0])
    console.log(res.json(req.files[0]))
  }
})

router.post('/upload_blog', async (req, res) => {
  const content = req.body.content
  const id = Date.now()

  try {
    let saveNameResult = pool.execute(`INSERT IGNORE INTO blog (id, content) VALUES (?, ?)`, [id, content])
    console.log('成功輸入', saveNameResult)
    console.log(id)
  } catch (e) {
    console.error(e)
  }
})

////////////////////////////

app.use('/api/chat', chatRouter)
app.use('/api/blog', blogRouter)

app.get('/', (req, res) => {
  res.send('homepage')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
