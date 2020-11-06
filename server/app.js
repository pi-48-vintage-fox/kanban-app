require('dotenv').config()
const cors = require('cors')
const express = require('express')
const routes = require('./routers/index')
const routesUser = require('./routers/user')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routesUser)
app.use(routes)
app.user(errorHandler)

app.listen(port, () => {
  console.log(`Oh yeah port ${port}`)
})