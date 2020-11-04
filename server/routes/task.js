const router = require('express').Router();
const TaskController = require('../controllers/taskController');
const Authentication = require('../middlewares/authentication');

router.use(Authentication);
router.get('/', TaskController.getTask);
router.post('/', TaskController.addTask);
router.patch('/', TaskController.categoryProduct);

module.exports = router;