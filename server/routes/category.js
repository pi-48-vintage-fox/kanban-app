const router = require('express').Router();
const Controller = require('../controllers/category');
const Authenticate = require('../middlewares/authenticate');
const Authorize = require('../middlewares/authorize');

router.use(Authenticate.user);

router.get('/:orgId', Authorize.organization, Controller.getCategories);
router.post('/:orgId', Authorize.organization, Controller.addCategory);
router.delete('/:orgId/:id', Authorize.organization, Controller.deleteCategory);

module.exports = router;