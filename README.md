# 前言

此專案為 MFEE27 資策會前端工程師就業養成班 HANDMADE 後端，使用 Node.js，啟動專案請先依照 .env.example 設定好 .env 檔案並安裝好套件

## HANDMADE 前端連結

- ## [handmade-front-end](https://github.com/angushyx/handmade)
- ## [handmade-backend](https://github.com/angushyx/handmade-b)

# 專案環境

- Git : `2.37.0.widows.1`
- Node : `16.16.0`
- Mysql2 : `^2.3.3`
- Socket.io : `^4.5.2`
- Googleapis : `^107.0.0`
- @Google-cloud/local-auth : `^2.1.0`

# 架構

> ### server : 統整所有 server 程式碼的地方
>
> > ### router : 主程式(server.js) 與邏輯 (controller) 溝通的橋樑
> >
> > > ### controller : 與資料庫溝通(需要邏輯也寫這裡)

### server.js 檔紀錄各類別路由

- restful API 主體(ex./api/user)
- 第一個參數：要到達的路由
- 第二個參數：router

```javaScript
app.use('/api/product', productRouter)
app.use('/api/course', courseRouter)
app.use('/api/store', storeRouter)
```

### routers 資料夾存放各細項路由及 api 類型

- restful API 動詞( get , post, put , delete )
- 第一個參數：要到達的路由
- 第二個參數：call back 函式 (放入 controller export 出來的函式)

```javascript
router.get('/:storeId', getStoreCourse)
router.get('/', getAllCourse)
router.post('/:courseId', addFavoriteCourseTable)
router.delete('/:courseId', removeFavoriteCourseTable)
router.get('/detail/:courseId', getCourseDetail)
router.get('/comment/:courseCommentId', getCourseComment)

module.exports = router
```

### controllers 資料夾存放 api 方法

- 在 controllers 資料夾中新增 reply-controller.js 檔案，裡面寫與 db 溝通的 sql 語法(記得引入資料庫)，最後要 export 出寫好的 function。

```javascript
const getStoreCourse = async (req, res) => {
  const storeId = req.params.storeId
  const [data] = await pool.execute(
    'SELECT course.*,store.name AS store_name, category.category_en_name FROM course JOIN store ON course.store_id = store.id JOIN category ON category.id = course.category_id WHERE course.store_id =?',
    [storeId]
  )

  const [courseImgs] = await pool.execute('SELECT course_img.*,course.store_id FROM course_img JOIN course ON course.id = course_img.course_id')

  const reaponse = data.map((v) => {
    const course_img = courseImgs.filter((img) => img.course_id === v.id)
    const imgName = course_img.map((img) => img.img_name)
    v['imgName'] = imgName
    return v
  })

  res.json(reaponse)
}
```

<!--
#### [後端技術](#Backend-technique)

- [Node.js](#Node.js)

#### [資料庫](#database)

- [MySQL](#MySQL) -->

#### Backend

<!-- - Using [mocha](https://github.com/mochajs/mocha) / [chai](https://github.com/chaijs/chai) / [sinon](https://github.com/sinonjs/sinon) / [supertest](https://github.com/visionmedia/supertest) for Unit Testing(Model / Request) and [Travis CI](https://travis-ci.org/) for continuous integration
- Using [NewebPay](https://www.newebpay.com/) as the third party payment API for user to pay subscription fee with credit card online
- Using [PostGIS](https://github.com/postgis/postgis) to help calculate geodesic distance
- Using [express-validator](https://github.com/express-validator/express-validator) for data validation
- Using [JSON Web Tokens](https://github.com/auth0/node-jsonwebtoken) to add token based authentication to RESTful API
- Using [nodemailer](https://github.com/nodemailer/nodemailer) to send email with Node.js after user sign up or place an order
- Using [Multer](https://github.com/expressjs/multer) 、[imgur-node-api](https://github.com/jamiees2/imgur-node-api) for file upload feature
- Using [bcryptjs](https://github.com/dcodeIO/bcrypt.js) to hash and check password
- Using [dotenv](https://github.com/motdotla/dotenv) to help load the environment variables saved in .env file
- Using [node-cron](https://github.com/node-cron/node-cron) as the task scheduler to automatically update order and meal data in the database
- Using [moment.js](https://github.com/moment/moment/) to parse date and time that are consistent with front-end and database -->
