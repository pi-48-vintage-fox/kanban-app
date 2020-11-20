'use strict'
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/route')
const port = process.env.PORT || 3000
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', routes)
app.use(errorHandler)

app.listen(port,()=>{
  console.log(`I love you ${port}`)
})