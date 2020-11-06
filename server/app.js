if(process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require ('cors')
const port = process.env.PORT || 3000
const routes = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Kanban running on http://http:localhost:${port}`)
})