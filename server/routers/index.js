const routes = require('express').Router()
const Task = require('./task')
const Category = require('./category')

routes.use('/tasks', Task)
routes.use('/category', Category)

module.exports = routes
