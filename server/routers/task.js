const routes = require('express').Router()
const TaskController = require('../controllers/taskController')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

routes.use(Authentication.authentication)
routes.post('/', TaskController.postTask)
routes.get('/', TaskController.getTask)
routes.get('/:id', Authorization.authorization, TaskController.getTaskById)
routes.put('/:id', Authorization.authorization, TaskController.putTask)
routes.patch('/:id', Authorization.authorization, TaskController.patchTask)
routes.delete('/:id', Authorization.authorization, Taskcontroller.delete)

module.exports = routes