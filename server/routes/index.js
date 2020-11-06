const router = require('express').Router()
const todoRouter = require('./task')
const userRouter = require('./user')

router.get('/', (req,res) =>{
res.send('kanban App')
})
router.use('/task', todoRouter)
router.use('/user', userRouter)


module.exports = router