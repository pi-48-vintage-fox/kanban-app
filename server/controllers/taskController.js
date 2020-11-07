const {Task, User} = require('../models/index');

class TaskController {
    static async getTask(req, res, next){
        try {
            const task = await Task.findAll({
                order: [['id', 'ASC']],
                include: User
            });

            if (task) {
                res.status(200).json(task);
            } else {
                next({
                    name: 'auth failed'
                })
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async addTask(req, res, next) {
        const newTask = {
            title: req.body.title,
            category: 'backlog',
            UserId: req.userHasLogin.id
        }
        try {
            const addTask = await Task.create(newTask);
            if (addTask) {
                res.status(201).json(addTask)
            } else if(!addTask) {
                next({
                    name: 'validation error'
                })
            }
        } catch (error) {
            next({
                name: error.errors[0].message
            })
        }
    }

    static async finById(req, res, next){
        try {
            const find = await Task.findByPk(+req.params.id)
            if (find) {
                res.status(200).json(find)
            } else {
                next({
                    name: 'not found'
                })
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async patch(req, res, next){
        try {
            const editCategory = await Task.update({
                category: req.body.category
            },
            {
                where: {
                    id: +req.params.id
                }
            });

            if (editCategory) {
                res.status(201).json({
                    msg: `Success update category task with id ${req.params.id}`
                });
            } else {
                next({
                    name: 'not found'
                })
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async editPut(req, res, next){
        const updateTask = {
            title: req.body.title
        };
        try {
            const newUpdateTask = await Task.update(updateTask, {
                where: {
                    id: +req.params.id
                }
            });
            if (newUpdateTask) {
                res.status(201).json({
                    msg: `Success update task with id ${req.params.id}`
                });
            } else {
                next({
                    name: 'not found'
                })
            }

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async delete(req, res, next){
        try {
            const deleteTask = await Task.destroy({
                returning: true,
                where: {
                    id: +req.params.id
                }
            });
            if (deleteTask) {
                res.status(201).json({
                    msg: `Success delete task with id ${req.params.id}`
                });
            } else {
                next({
                    name: 'not found'
                })
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = TaskController;