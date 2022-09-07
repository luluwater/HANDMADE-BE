const multer = require('multer')
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
    //TODO: 改成 uuid
    cb(null, `blog-${Date.now()}.${ext}`)
  },
})

// TODO: 還可以過濾圖片、篩選檔案型別 file.mimetype
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
