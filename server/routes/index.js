const router = require('express').Router()

const authentication = require('../middlewares/authentication')
const taskRoutes = require('./taskRoutes')
const categoryRoutes = require('./categoryRoutes')
const UserController = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')

router.get('/', (req, res) => res.send('Kanban App'))
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)

router.use(authentication)
router.get('/users/orgs', UserController.findOrgMembers)
router.get('/users/:UserId', UserController.findById)

router.use('/tasks', taskRoutes)
router.use('/categories', categoryRoutes)

router.use(errorHandler)

module.exports = router