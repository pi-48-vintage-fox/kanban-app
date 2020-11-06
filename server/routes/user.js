const routes = require('express').Router()
const UserController = require('../controllers/userController')

routes.post('/register', UserController.Register)
routes.post('/login', UserController.Login)
routes.post('/loginGoogle', UserController.googleLogin)

module.exports = routes