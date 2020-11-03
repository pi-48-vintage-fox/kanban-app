const router  = require('express').Router()
const taskRouter = require('./task')
const userRouter = require('./user')

router.use(userRouter)
router.use(taskRouter)

module.exports = router