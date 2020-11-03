const { report } = require('./user')

const router = require('express').Router()
const TaskController = require('../controllers/task')
const authorization = require('../middleware/authorization')
const authentication = require('../middleware/authentication')

router.use(authentication)
router.get('/', TaskController.allTasks)
router.post('/', authorization, TaskController.addTask)
router.put('/:id', authorization, TaskController.editTask)
router.patch('/:id', authorization, TaskController.changeCategory)
router.delete('/:id', authorization, TaskController.deleteTask)


module.exports = router