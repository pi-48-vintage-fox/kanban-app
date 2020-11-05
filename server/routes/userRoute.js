'use strict'
const express = require('express');
const UserController = require('../controllers/UserController');
const userRoute = express.Router()

userRoute.post("/assign",UserController.assign)

module.exports = userRoute