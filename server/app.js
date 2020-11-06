require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/index')
const PORT = 3000
var cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
 
app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening to port:${PORT}`)
})