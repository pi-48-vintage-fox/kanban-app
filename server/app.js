const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorhandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


app.use(routes)
app.use(errorHandler)



app.listen(PORT, () => {

  console.log(`App running on PORT: ${PORT}`)

})