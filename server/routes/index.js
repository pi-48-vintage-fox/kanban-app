const express = require('express');
const router = express.Router()
const Controller = require('../controllers/Controller');
const taskRoutes = require('./task');
const categoryRouter = require('./category');
const {authentication} = require('../middlewares/security');


router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.post("/googleLogin", Controller.googleLogin)
router.get("/conjunctions",authentication, Controller.getAllConj)

router.use("/tasks", taskRoutes)
router.use("/categories", categoryRouter)

module.exports = router