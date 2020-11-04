const {Task, User} = require('../models/index');

class TaskController {
    static async getTask(req, res){
        try {
            const task = await Task.findAll();
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async addTask(req, res) {
        const newTask = {
            title: req.body.title,
            category: 'backlog',
            UserId: req.userHasLogin.id
        }

        try {
            const addTask = await Task.create(newTask)
            res.status(201).json(addTask)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = TaskController;