'use strict'
const express = require('express');
const taskRoute = require('./tasksRoute');
const userRoute = require('./userRoute');
const organizationRoute = require('./organizationRoute');
const UserController = require('../controllers/UserController');
const Routes = express.Router()

Routes.post("/login",UserController)
Routes.post("/register",UserController)

Routes.use("/tasks",taskRoute)
Routes.use("/users",userRoute)
Routes.use("/organizations",organizationRoute)


module.exports = Routes