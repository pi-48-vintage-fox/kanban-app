const router = require('express').Router()

const authentication = require('../middlewares/authentication')
const taskRoutes = require('./taskRoutes')
const categoryRoutes = require('./categoryRoutes')
const UserController = require('../controllers/UserController')
const OrganizationController = require('../controllers/OrganizationController')
const errorHandler = require('../middlewares/errorHandler')

router.get('/', (req, res) => res.send('Kanban App'))
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.get('/organizations', OrganizationController.findAll)

router.use('/categories', categoryRoutes)
router.use(authentication)
router.get('/users/', UserController.findOrgMembers)
router.get('/users/:UserId', UserController.findById)

router.use('/tasks', taskRoutes)

router.use(errorHandler)

module.exports = router
