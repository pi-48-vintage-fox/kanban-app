'use strict'

const taskRouter = require('./taskRouter')
const userRouter = require('./userRouter')

const router = require('express').Router()

router.use(userRouter)
router.use(taskRouter)

module.exports = router