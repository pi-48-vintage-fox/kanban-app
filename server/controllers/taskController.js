  const { Task } = require('../models')

  class TaskController {

    static postNewTask (req, res, next) {

      
      
      const { title } = req.body
      const UserId = +req.loggedInUser.id
      
      const newTask = {
        title,
        UserId
      }
      Task.create(newTask)
        .then(task => {
          res.status(201).json({
            id: task.id, 
            task: task.title, 
            category: task.category,
            UserId: task.UserId
          })
        })
        .catch(err => {
          next(err)
        })
    }
    static showAllTask (req, res, next){

     
        Task.findAll()
          .then(task => {
            res.status(200).json({task})
          })
          .catch(err => {
            next(err)
          })
    }

    static showAllTaskbyUserId (req, res, next) {

      const id = +req.loggedInUser.id

      Task.findAll({
        where: {
          UserId: id
        }
      })
          .then(task => {
            res.status(200).json({task})
          })
          .catch(err => {
            next(err)
          })

    }

    static getTaskById (req, res, next) {

      let id = +req.params.id

      Task.findByPk(id)
        .then(task => {
          res.status(200).json({
            id: task.id,
            task: task.title,
            category: task.category,
            UserId: task.UserId
          })
        })
        .catch(err => {
          next(err)
        })

    }

    static deleteTask (req, res, next) {

      let id = +req.params.id

      Task.destroy({
        where : {
          id: id
        }
      })
        .then(() => {
          res.status(200).json({msg: 'data Successfully deleted'})
        })
        .catch(err => {
          next(err)
        })
    }

  }

  module.exports = TaskController