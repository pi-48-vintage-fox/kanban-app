const router = require('express').Router()
const TaskController = require('../controllers/TaskController')

const {isMember, isTaskCreator} = require('../middlewares/authorization')
const errorHandler = require('../middlewares/errorHandler')

router.get('/', TaskController.tasks)
router.get('/user', TaskController.tasksByUser)
router.post('/', isMember, TaskController.addTask)
router.get('/:TaskId', isMember, TaskController.getTaskById)

// router.use(authorization)
router.put('/:TaskId', isTaskCreator, TaskController.putTask)
router.patch('/:TaskId', isTaskCreator, TaskController.patchTask)
router.delete('/:TaskId', isTaskCreator, TaskController.deleteTask)

router.use(errorHandler)
module.exports = router
