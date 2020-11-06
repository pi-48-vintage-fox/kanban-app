require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/index')
const PORT = 3000
var cors = require('cors')
 
app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Listening to port:${PORT}`)
})