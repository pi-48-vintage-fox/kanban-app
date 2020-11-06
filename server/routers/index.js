const routes = require('express').Router()
const Task = require('./task')

routes.use('/tasks', Task)

module.exports = routes