const router = require('express').Router()
const routerTask = require('./task')
const authentication = require('../middleware/authentication')
const userController = require('../controller/userController')

router.post('/login', userController.login)
router.use(authentication)
router.post('/register', userController.register)

router.use('/task', routerTask)

module.exports = router