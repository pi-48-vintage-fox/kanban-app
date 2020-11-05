const routes = require('express').Router()
const user = require('./user')
const task = require('./task')

routes.use(user)
routes.use('/tasks', task)

routes.get('/', (req, res) => {
    res.status(200).json({ msg: 'Welcome to Kanban App' })
})

module.exports = routes