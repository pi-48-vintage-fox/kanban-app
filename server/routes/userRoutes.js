const userController = require('../controllers/userController')
const routes = require('express').Router()

routes.post('/register', userController.register)
routes.post('/login', userController.login)
routes.post('/googleLogin', userController.google)
module.exports = routes
