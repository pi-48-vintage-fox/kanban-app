const routes = require('express').Router()
const Tasks = require('./tasks')

routes.use('/tasks', Tasks)

module.exports = routes