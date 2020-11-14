if(process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    require('dotenv').config()
}

const express = require('express');
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const routes = require('./routes/index');
const errorHandlers = require('./middlewares/errorHandlers');

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/", routes)
app.use(errorHandlers)

app.listen(PORT, () => console.log(`Server berjalan pada ${PORT}`))