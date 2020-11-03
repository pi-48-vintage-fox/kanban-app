const router = require('express').Router()
const TaskController = require('../controllers/TaskController')

const authorization = require('../middlewares/authorization')

router.get('/', TaskController.tasks)
router.post('/', TaskController.addTask)
router.get('/:TaskId', TaskController.getTaskById)

// router.use(authorization)
router.put('/:TaskId')
router.patch('/:TaskId')
router.delete('/:TaskId')

module.exports = router
