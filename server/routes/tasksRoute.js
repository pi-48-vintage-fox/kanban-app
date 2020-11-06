'use strict'
const express = require('express');
const TaskController = require('../controllers/TaskController');
const { authorization } = require('../middlewares/authMiddleware');
const taskRoute = express.Router()

taskRoute.get('/',TaskController.index)
taskRoute.post('/',TaskController.insert)
taskRoute.put("/:id",authorization, TaskController.update)
taskRoute.patch("/:id",authorization, TaskController.updateTaskCategory)
taskRoute.patch("/tags/:id",authorization, TaskController.addTag)
taskRoute.delete("/:id",authorization, TaskController.destroy)

module.exports = taskRoute