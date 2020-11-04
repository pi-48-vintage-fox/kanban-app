const { Task } =  require('../models/index')

class Controller {
    static addTask(req, res, next){
        let date = new Date()
        const obj = {
            title:req.body.title,
            category:"backlog",
            tag:req.body.tag,
            UserId:req.decoded.id,
            createdAt: date,
            updatedAt: date
        }
        Task.create(obj)
        .then(result =>{
            res.status(201).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }

    static readTask(req,res){
        Task.findAll({
            where:{
                UserId: req.decoded.id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static readById(req, res) {
        Todo.findByPk({
            where: {
                UserId: req.decoded.id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static editTask(req,res) {
        const id = +req.params.id
        const obj = {
            title: req.body.title,
            category: req.body.category,
        }
        Task.update(obj, {
            where: {
                id
            },
            returning: true
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static updateTask(req, res, next){
        const id = +req.params.id
        const obj = {
            category: req.body.category
        }
        Task.update(obj, {
            where: {
                id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        const id = +req.params.id
        Task.destroy({
            where:{
                id
            }
        })
        .then(result => {    
        res.status(200).json({message: 'Deleted Success'})
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = Controller