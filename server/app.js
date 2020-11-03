require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

const routes = require('./routes/')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use(routes)
app.use(errorHandler)

app.listen(port,()=>{
    console.log('this app listening to ' + port)
})