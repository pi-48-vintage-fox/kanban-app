  const { Task , User } = require('../models')

  class TaskController {

    static postNewTask (req, res, next) {

      const { title, description } = req.body
      const UserId = +req.loggedInUser.id
      
      const newTask = {
        title,
        description,
        UserId
      }
      Task.create(newTask)
        .then(task => {
          res.status(201).json({
            id: task.id, 
            task: task.title, 
            category: task.category,
            description: task.description,
            UserId: task.UserId
          })
        })
        .catch(err => {
          next(err)
        })
    }
    static showAllTask (req, res, next){

     
        Task.findAll({
          include: User,
          order:[['createdAt','DESC']]
        })
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
          .then(tasks => {
            res.status(200).json(tasks)
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

    static updateTask (req, res, next) {

      let id = +req.params.id
      let { task, description } = req.body
      let updateTask = {
        title: task,
        description: description
      }

      Task.update(updateTask, {
        where: {
          id: id
        },
        returning: true
      })
        .then((data) =>{
          res.status(200).json(data)
        })
        .catch(err => {
          next(err)
        })
    }

    static updateCategory (req, res, next) {

      let id = +req.params.id
      let category = req.body.category

      if(category === 'backlog'){
        category = 'todo'

      } else if(category  === 'todo'){
        category = 'doing'

      } else if(category === 'doing'){
        category = 'done'
      }

      let objCategory = {
        category
      }
      Task.update(objCategory, {
        where: {
          id: id
        },
        returning: true
      })
        .then(data => {
          res.status(200).json(data)
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