const router = require('express').Router();
const Authenticate = require('../middlewares/authenticate');
const Controller = require('../controllers/task');
const Authorize = require('../middlewares/authorize');

router.use(Authenticate.user);

router.get('/', Controller.getTasks);
router.post('/', Controller.addTask);
router.put('/:id', Authorize.task, Controller.editTask);
router.patch('/:id', Authorize.task, Controller.moveTask);
router.delete('/:id', Authorize.task, Controller.deleteTask);

module.exports = router;