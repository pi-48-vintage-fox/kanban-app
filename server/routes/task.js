const router = require('express').Router();
const Authenticate = require('../middlewares/authenticate');
const Controller = require('../controllers/task');
const Authorize = require('../middlewares/authorize');

router.use(Authenticate.user);

router.post('/', Controller.addTask);
router.put('/:id', Authorize.task, Controller.editTask);
router.patch('/:id', Authorize.task, Controller.moveTask);
router.delete('/:id', Authorize.task, Controller.deleteTask);
router.get('/:orgId', Authorize.organization, Controller.getTasks);


module.exports = router;