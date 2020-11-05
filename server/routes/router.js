const router = require('express').Router()
const routerTask = require('./task')
const userController = require('../controller/userController')

router.post('/login', userController.login)
router.post('/register', userController.register)

router.use('/task', routerTask)

module.exports = router