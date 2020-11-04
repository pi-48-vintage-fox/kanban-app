// const SibApiV3Sdk = require('sib-api-v3-sdk')
const { Task, User } = require('../models')
// const { tomorrow, toDateString, convertToWesternFormat } = require('../helpers/date')

class TaskController {

  
  static async tasks(req, res, next) {

    try {

      const {OrganizationId} = req.user

      const tasks = await Task.findAll({
        where: { OrganizationId }
      })
      
      res.status(200).json(tasks)
    } catch (error) {
      next(error)
    }
  }

  static async tasksByUser(req, res, next) {

    const {user} = req
    console.log({user}, '<< task controller')

    try {
      const tasks = await Task.findAll({
        where: {
          UserId: user.id,
        },
        order: [['createdAt', 'ASC']],

      })
      
      // console.log(JSON.stringify(tasks,null,2))

      res.status(200).json(tasks)

    } catch (error) {
      next(error)
    }
  }


  
  static async getTaskById(req, res, next) {

    try {
      const task = await Task.findByPk(req.params.TaskId)

      res.status(200).json(task)
      
    } catch (error) {
      next(error)
    }
  }
  
  static async addTask(req, res, next) {
    console.log(req.user, '\n^---- req user')
    
    const { id, OrganizationId } = req.user

    req.body.UserId = id
    req.body.OrganizationId = OrganizationId

    try {
      const task = await Task.create(req.body)

      res.status(200).json(task)
      
    } catch (error) {
      next(error)
    }
  }


  static async putTask(req, res, next) {
    console.log(req.body, '<<< put task controller')

    try {

      let {TaskId} = req.params

      if (!await Task.findByPk(TaskId)) {
        throw {status: 404, msg: 'Task not found'}
      }
  
      let opt = {}

      for (let key in req.body) {
        opt[key] = req.body[key]
      }
  
      try {
        await Task.update( opt, {
          where: { id: TaskId }
        })
        
        res.status(200).json({msg: 'Task modified successfully'})
      } catch (error) {
        next(error)
        
      }
      
    } catch (error) {
      next(error)
    }
   
  }

  static async patchTask(req, res, next) {
    console.log(req.body, '<<< patch task controller')
    
    try {
      let {TaskId} = req.params
      

      let newCategoryId = req.body.CategoryId

      console.log({TaskId, newCategoryId})

      if (newCategoryId) {
        await Task.update( {CategoryId: newCategoryId}, {
          where: { id: TaskId }
        })
        
        res.status(200).json({msg: `Task successfully moved`})

      } else {
        throw { status: 404, msg: 'Task not found'}
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteTask(req, res, next) {

    console.log('delete task')

    try {

      await Task.destroy({
        where: {id: req.params.TaskId}
      })

      res.status(200).json({msg: 'Task deleted successfully'})
      
    } catch (error) {
      next(error)
    }
  } 
}


module.exports = TaskController