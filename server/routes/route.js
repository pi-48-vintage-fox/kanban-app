'use strict'

const router = require('express').Router()
const UserController = require('../controllers/UserController')
const TaskController = require('../controllers/TaskController')
const CategoryController = require('../controllers/CategoryController')
const { authentication, authorization } = require('../middlewares/auth')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googlelogin', UserController.googleLogin)


router.get('/tasks',authentication, TaskController.show)
router.post('/tasks/', authentication, TaskController.add)
router.put('/tasks/:id',authentication, authorization, TaskController.edit)
router.delete('/tasks/:id',authentication, authorization, TaskController.delete)

router.patch('/tasks/:id', authentication, authorization, TaskController.move)

router.post('/categories', authentication, CategoryController.addCategory)

module.exports = router