const routes = require('express').Router()
const TaskController = require('../controllers/taskController')
const Authentication = require('../middlewares/auth')
const { Authorization } = require('../middlewares/author')

routes.use(Authentication)
routes.get('/', TaskController.getTasks)
routes.post('/', TaskController.addTask)
routes.put('/:id', Authorization, TaskController.updateTask)
routes.delete('/:id', Authorization, TaskController.deleteTask)

module.exports = routes