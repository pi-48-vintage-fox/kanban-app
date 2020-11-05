'use strict'
const express = require('express');
const TaskController = require('../controllers/TaskController');
const taskRoute = express.Router()

taskRoute.get('/',TaskController.index)
taskRoute.post('/',TaskController.insert)
taskRoute.put("/:id",TaskController.update)
taskRoute.patch("/:id",TaskController.updateTaskCategory)
taskRoute.delete("/:id",TaskController.destroy)

module.exports = taskRoute