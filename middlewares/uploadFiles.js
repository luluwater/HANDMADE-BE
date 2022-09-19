const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const fileName = (req, file, cb) => {
  const isAvatar = file.originalname.includes('profile')

  let ext = file.originalname.match(/\..*$/)[0]

  isAvatar ? cb(null, `user_${uuidv4()}.${ext}`) : cb(null, `blog_${uuidv4()}.${ext}`)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: fileName,
})

const upload = multer({ storage })

module.exports = { upload }
