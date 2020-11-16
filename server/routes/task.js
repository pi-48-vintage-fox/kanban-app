const router = require('express').Router()
const taskController = require('../controller/taskController')
const authorization = require('../middleware/authorization')
const authentication = require('../middleware/authentication')



router.post('/', taskController.create)
router.get('/', taskController.showAll)
router.use(authentication)
router.put('/:id', authorization, taskController.update)
router.patch('/:id', authorization, taskController.updateCategory)
router.delete('/:id', authorization, taskController.delete)


module.exports = router