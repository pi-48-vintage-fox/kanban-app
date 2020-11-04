const router = require('express').Router()
const todoRouter = require('./task')
const userRouter = require('./user')


router.use('/task', todoRouter)
router.use('/user', userRouter)


module.exports = router