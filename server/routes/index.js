const router = require('express').Router();
const Controller = require('../controllers/index');
const taskRoutes = require('./task');
const organizationRoutes = require('./organization');
const Authenticate = require('../middlewares/authenticate');

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/relations', Authenticate.user, Controller.userJoinOrg);

router.use('/tasks', taskRoutes);
router.use('/organizations', organizationRoutes);

module.exports = router;