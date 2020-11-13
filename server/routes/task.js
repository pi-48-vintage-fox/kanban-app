const router = require('express').Router()
const taskController = require('../controller/taskController')
const authorization = require('../middleware/authorization')



router.post('/', taskController.create)
router.get('/', taskController.showAll)
router.put('/:id', authorization, taskController.update)
router.patch('/:id', authorization, taskController.updateCategory)
router.delete('/:id', authorization, taskController.delete)


module.exports = router