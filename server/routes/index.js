const router = require("express").Router()
const tasksRoutes = require("./taskRoutes")
const usersRoutes = require("./usersRoutes")
const categoriesRoutes = require("./categoriesRoutes")

router.use(usersRoutes)
router.use('/tasks',tasksRoutes)
router.use('/categories',categoriesRoutes)

module.exports = router