const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const { authorization } = require('../middlewares/auth')

router.post('/', TaskController.postNewTask)
router.get('/', TaskController.showAllTask)
router.delete('/:id', authorization, TaskController.deleteTask)
router.get('/:id', authorization ,TaskController.getTaskById)
router.put('/:id', authorization, TaskController.updateTask)
router.patch('/:id', authorization, TaskController.updateCategory)


module.exports = router