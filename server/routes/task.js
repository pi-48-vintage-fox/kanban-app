const TaskController = require('../controllers/taskController')
const authentication = require('../middlewares/authentication')
const router = require('express').Router()

// router.use(authentication)
router.get('/', TaskController.showAll)
router.post('/', TaskController.add)
router.patch('/:id', TaskController.changeCat)
router.put('/:id', TaskController.edit)

module.exports = router