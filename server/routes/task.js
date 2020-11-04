const TaskController = require('../controllers/taskController')
const router = require('express').Router()

router.get('/', TaskController.findAll)
router.post('/', TaskController.add)
router.patch('/', TaskController.changeCat)
router.put('/', TaskController.edit)

module.exports = router