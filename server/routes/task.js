const TaskController = require('../controllers/taskcontroller')

const router  = require('express').Router()

router.post('/tasks',TaskController.addTask)
router.get('/tasks',TaskController.showTasks)
router.put('/tasks/:id',TaskController.editTask)
router.patch('/tasks/:id',TaskController.updateTask)
router.delete('/tasks/:id',TaskController.deleteTask)

module.exports = router