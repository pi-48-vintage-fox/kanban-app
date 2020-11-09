const TaskController = require('../controllers/taskController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const router = require('express').Router()

router.use(authentication)
router.get('/', TaskController.showAll)
router.post('/', TaskController.add)
router.patch('/:id', authorization, TaskController.changeCat)
router.put('/:id', authorization, TaskController.edit)
router.delete('/:id', authorization, TaskController.delete)

module.exports = router