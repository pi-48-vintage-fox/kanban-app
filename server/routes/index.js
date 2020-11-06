const routes = require('express').Router()
const userRoutes = require('./userRoutes')
const taskRoutes = require('./taskRoutes')
const {authentication} = require('../middlewares/auth')

routes.use('/user', userRoutes)
routes.use(authentication)
routes.use('/task', taskRoutes)

module.exports = routes