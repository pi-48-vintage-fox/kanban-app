const router = require('express').Router()
const Controller = require('../controllers/TaskController')
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authenticate)
router.get('/',Controller.readCategory)
router.patch('/:id',authorization, Controller.updateTask)

module.exports = router