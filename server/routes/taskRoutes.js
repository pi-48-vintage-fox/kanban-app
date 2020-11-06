const taskRoutes = require('express').Router()
const taskController = require('../controllers/taskController')
const {authorization} = require('../middlewares/auth')

taskRoutes.post('/', taskController.posting)
taskRoutes.get('/', taskController.getPosting)
taskRoutes.patch('/category/:id',authorization, taskController.category)
taskRoutes.patch('/title/:id',authorization, taskController.title)
taskRoutes.delete('/:id',authorization, taskController.delete)


module.exports = taskRoutes