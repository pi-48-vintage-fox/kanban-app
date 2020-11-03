const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const { authorization } = require('../middlewares/auth')

router.post('/', TaskController.postNewTask)
router.get('/', TaskController.showAllTask)
router.get('/user', TaskController.showAllTaskbyUserId)
router.delete('/:id', authorization, TaskController.deleteTask)
router.get('/:id', authorization ,TaskController.getTaskById)


module.exports = router