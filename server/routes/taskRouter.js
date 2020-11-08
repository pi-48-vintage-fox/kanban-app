const TaskController = require('../controllers/task')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const taskRouter = require('express').Router()

taskRouter.use(authentication)
taskRouter.post('/task',TaskController.addTask)
taskRouter.get('/task',TaskController.listTasks)
taskRouter.put('/task/:id',authorization, TaskController.updateTask)
taskRouter.patch('/task/:id',authorization, TaskController.updateCategory)
taskRouter.delete('/task/:id',authorization, TaskController.deleteTask)

module.exports = taskRouter