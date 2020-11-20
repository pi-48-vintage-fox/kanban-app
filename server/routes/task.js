const router = require('express').Router()
const controller = require('../controllers/TaskController')
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authenticate)
router.post('/', controller.addTask)
router.get('/', controller.readTask)
router.get('/:id', controller.readById)
router.put('/:id',authorization, controller.editTask)
router.delete('/:id',authorization, controller.delete)



module.exports = router 