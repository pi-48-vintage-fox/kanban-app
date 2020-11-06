const {Task, User, Category} = require('../models/index')

class TaskController {
    static allTasks (req, res, next) {

        Task.findAll({include: [User, Category]})
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => {
            next(err)
        })
    }

    static addTask (req, res, next) {

        const payload = {
            title: req.body.title,
            description: req.body.description,
            CategoryId : req.body.CategoryId, 
            UserId: req.loggedInUser.id
        }
        Task.create(payload)
        .then(task => {
            res.status(201).json(task)
        })
        .catch(err => {
            next(err)
        })
    }

    static changeCategory (req, res, next) {

        const id = +req.params.id
        const CategoryId = +req.body.CategoryId 

        Task.findByPk(id)
        .then(task => {
            console.log(task)
            return Task.update({CategoryId}, {
                where: {
                    id: id
                }
            })
        })
        .then(updatedTask => {
            if(!id){
                let err = {
                    name: 'Not Found'
                }
                throw next(err)
            }
            else if(!updatedTask){
                let err = {
                    name: 'SequelizeValidationError'
                }
                throw next(err)
            }
            else{
                res.status(200).json('Success update category')
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static editTask (req, res, next) {

        const id = req.params.id
        const payload = {
            title: req.body.title,
            description: req.body.description,
            CategoryId : req.body.CategoryId, 
            UserId: req.loggedInUser.id
        }

        Task.update(payload, {
            where: {
                id: id
            }
        })
        .then(task => {
            if(!id){
                let err = {
                    name: 'Not Found'
                }
                throw next(err)
            }
            else if(!task){
                let err = {
                    name: 'SequelizeValidationError'
                }
                throw next (err)
            }
            else{
                res.status(200).json(task)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTask (req, res, next) {
        
        const id = req.params.id
        Task.destroy({
            where: {
                id: id
            }
        })
        .then(deletedTask => {
            if(!deletedTask){
                let err = {
                    name: 'Not Found'
                }
                throw next(err)
            }
            else {
                res.status(200).json({message: 'Task sucess to delete'})
            }
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = TaskController