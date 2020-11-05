require('dotenv').config()
const express  = require('express')
const app = express()
const port = process.env.PORT || 3000
// Router
const router = require('./routes/router')
// Middleware error handling
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`App berada di http://localhost:${port}`);
})

// Router dan controller