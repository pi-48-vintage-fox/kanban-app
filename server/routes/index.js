'use strict'
const express = require('express');
const taskRoute = require('./tasksRoute');
const userRoute = require('./userRoute');
const organizationRoute = require('./organizationRoute');
const UserController = require('../controllers/UserController');
const categoryRoutes = require('./categoryRoutes');
const {authenticate} = require('../middlewares/authMiddleware');
const Routes = express.Router()

Routes.post("/login",UserController.login)
Routes.post("/register",UserController.register)
Routes.post('/oauth',UserController.oauth)

Routes.use("/tasks",authenticate,taskRoute)
Routes.use("/users",authenticate,userRoute)
Routes.use("/organizations",authenticate,organizationRoute)
Routes.use("/categories",authenticate,categoryRoutes)

module.exports = Routes