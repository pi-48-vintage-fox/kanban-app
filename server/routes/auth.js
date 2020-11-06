const router = require('express').Router();
const AuthControler = require('../controllers/authController');
const taskRouter = require('./task');
const errorHandler = require('../middlewares/errorHandler');

router.post('/register', AuthControler.register);
router.post('/login', AuthControler.login);
router.post('/google-login', AuthControler.googleLogin);
router.use('/task', taskRouter);
router.use(errorHandler);

module.exports = router;