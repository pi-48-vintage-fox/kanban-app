if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
const express  = require('express')
const app = express()
const port = process.env.PORT || 3000
// Router
const router = require('./routes/router')
// Middleware error handling
const errorHandling = require("./middleware/erroHandling")
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
app.use(errorHandling)

app.get('/', (req, res) => {
  res.send({ message: 'Google OAuth' })
})

app.listen(port, () => {
  console.log(`App berada di http://localhost:${port}`);
})

// Router dan controller
// link deploy heroku: https://kaban-fox-has.herokuapp.com/
// link deploy firebase: https://kaban-fox-has.web.app/