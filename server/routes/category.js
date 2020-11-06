const router = require('express').Router()
const Controller = require('../controllers/TaskController')
const authenticate = require('../middlewares/authentication')

router.get('/',authenticate,Controller.readCategory)

module.exports = router