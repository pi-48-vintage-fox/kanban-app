const router = require('express').Router();
const TaskController = require('../controllers/taskController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);
router.get('/', TaskController.getTask);
router.post('/', TaskController.addTask);
router.get('/:id', TaskController.finById);
router.patch('/:id', authorization, TaskController.patch);
router.put('/:id', authorization, TaskController.editPut);
router.delete('/:id', authorization, TaskController.delete);

module.exports = router;