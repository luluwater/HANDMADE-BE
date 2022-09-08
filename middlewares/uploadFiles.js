const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

/**
 * imgae
 */

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split('.')
    ext = ext[ext.length - 1]
    //用日期來給檔案名稱
    cb(null, `${uuidv4()}.${ext}`)
  },
})
const upload = multer({ storage })

module.exports = { upload }
