const router = require('express').Router()
const taskController = require('../controller/taskController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')



router.post('/', authentication, taskController.create)
router.get('/', taskController.showAll)
router.put('/:id', authentication, taskController.update)
router.patch('/:id', authentication, taskController.updateCategory)
router.delete('/:id', authentication, taskController.delete)


module.exports = router