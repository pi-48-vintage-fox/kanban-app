const routes = require('express').Router()
const TaskController = require('../controllers/taskController')
const Authentication = require('../middlewares/authentication')

routes.use(Authentication.authentication)
routes.get('/', TaskController.getCategory)

module.exports = routes
