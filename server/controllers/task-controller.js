const { Task, User } = require("../models/index")

class TaskController {
    
    static getAllTask(req, res) {
        Task.findAll({
            include: [ 'User']
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json(err)   
        })
    }
//================================
    static postTaskById(req, res) {
        let data = {
            title: req.body.title,
            category: req.body.category,
            UserId: req.isLogin
        }
        Task.create(data, {
            returnig: true
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }
//================================
    static putTaskById(req, res) {
        let data = {
            title: req.body.title,
            category: req.body.category
        }
        Task.update(data, {
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then(result => {
            res.status(201).json(result[1])
            console.log(result);
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }
//================================
    static patchTaskById(req, res) {
        let data = {
            category: req.body.category
        }
        Task.update(data, {
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then(result => {
            res.status(201).json(result[1])
            console.log(result);
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }
//================================
    static deleteTaskById(req, res) { 
        let idTask = +req.params.id
        Task.destroy({
            where: {
                id: idTask 
            }
        })
        .then(result => {
            res.status(200).json({message: "Delete Task Successfuly"})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TaskController