const router = require('express').Router()
const taskController = require('../controller/taskController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)

router.post('/', taskController.create)
router.get('/', taskController.showAll)
router.put('/:id', taskController.update)
router.patch('/:id', taskController.updateCategory)
router.delete('/:id', taskController.delete)


module.exports = router