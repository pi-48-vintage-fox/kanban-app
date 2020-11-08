const router = require('express').Router()
const TaskController = require('../controllers/TaskController')

const { isMember, isTaskCreator } = require('../middlewares/authorization')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')

router.get('/', authentication, TaskController.tasks)
router.get('/user', authentication, TaskController.tasksByUser)
router.post('/', authentication, isMember, TaskController.addTask)
router.get('/:TaskId', authentication, isMember, TaskController.getTaskById)

// router.use(authorization)
router.put('/:TaskId', authentication, isTaskCreator, TaskController.putTask)
router.patch(
  '/:TaskId',
  authentication,
  isTaskCreator,
  TaskController.patchTask
)
router.delete(
  '/:TaskId',
  authentication,
  isTaskCreator,
  TaskController.deleteTask
)

router.use(errorHandler)
module.exports = router
