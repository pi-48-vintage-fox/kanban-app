const router = require('express').Router();
const Controller = require('../controllers/organization')

router.post('/', Controller.createOrganization);
router.get('/', Controller.getAllOrganization);

module.exports = router;