const router = require('express').Router();
const Controller = require('../controllers/index');
const taskRoutes = require('./task');
const categoryRoutes = require('./category');
const organizationRoutes = require('./organization');
const Authenticate = require('../middlewares/authenticate');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is running'
  })
})

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/googleLogin', Controller.googleLogin);
router.post('/relations', Authenticate.user, Controller.userJoinOrg);

router.use('/tasks', taskRoutes);
router.use('/categories', categoryRoutes);
router.use('/organizations', organizationRoutes);

module.exports = router;