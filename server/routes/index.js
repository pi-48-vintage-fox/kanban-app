const routes = require('express').Router()
const Controller = require('../controllers/controller')

const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

//Login-Register==================================================
routes.post('/register', Controller.register)
routes.post('/login', Controller.login)
routes.post('/google-login', Controller.googleLogin)

routes.use(authentication)

//Task============================================================
routes.get('/tasks', Controller.showTask)
routes.post('/tasks', Controller.addTask)
routes.put('/tasks/:id', authorization, Controller.editTask)
routes.delete('/tasks/:id', authorization, Controller.deleteTask)
routes.patch('/tasks/:id', authorization, Controller.moveTask)

module.exports = routes