const express = require('express');
const router = express.Router()
const TaskController = require('../controllers/TaskController');
const {authentication, authorization} = require('../middlewares/security');

router.use(authentication)

router.get("/", TaskController.getAllTasks)
router.post("/", TaskController.addTask)
router.put("/:id", authorization, TaskController.editTask)
router.patch("/:id", authorization, TaskController.updateCategory)
router.delete("/:id", authorization, TaskController.delete)

module.exports = router