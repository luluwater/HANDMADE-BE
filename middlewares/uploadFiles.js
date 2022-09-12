const express = require('express')

const app = express()

app.post('/Login', (req, res, next)=>{
  
},
app.get('/', (req, res) => {
  res.send('Hello Express')
})

app.listen(3001, () => {
  console.log(`server start at 3001`)
})
