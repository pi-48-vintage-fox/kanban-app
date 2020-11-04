const router = require('express').Router();
const AuthControler = require('../controllers/authController');
const taskRouter = require('./task');

router.post('/register', AuthControler.register);
router.post('/login', AuthControler.login);
router.use('/task', taskRouter);

module.exports = router;