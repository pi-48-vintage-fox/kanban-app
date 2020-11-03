// const SibApiV3Sdk = require('sib-api-v3-sdk')
const { Organization, Task } = require('../models')
const { Op } = require("sequelize");
// const { tomorrow, toDateString, convertToWesternFormat } = require('../helpers/date')

class TaskController {

  static async tasks(req, res, next) {

    const user = req.user
    console.log({user}, '<< task controller')

    try {
      const tasks = await Task.findAll({
        where: {
          createdBy: user.id,
        },
        order: [['due_date', 'ASC']],

        include: Organization
      })
      
      // console.log(JSON.stringify(tasks,null,2))

      res.status(200).json(tasks)

    } catch (error) {
      console.log({error})
      next(error)
    }
  }


  // static async getTasksByOrganization(req, res, next) {

  //   try {
  //     const tasks = await Task.findAll({
  //       where: { OrganizationId: req.params.OrganizationId}
  //     })
      
  //     res.status(200).json(tasks)
  //   } catch (error) {
  //     console.log(error)
  //     next(error)
      
  //   }

  // }

  
  static async getTaskById(req, res, next) {

    try {
      const task = await Task.findByPk(req.params.TaskId)

      res.status(200).json(task)
      
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  
  static async addTask(req, res, next) {

    const { OrganizationId } = req.user
    const { id } = req.user

    req.body.OrganizationId = +OrganizationId
    req.body.UserId = id

    try {
      const task = await Task.create(req.body)

      res.status(200).json(task)
      
    } catch (error) {
      console.log(error)
      next(error)
      
    }

  }


  static async putTask(req, res, next) {
    console.log(req.body, '<<< put task controller')

    let {TaskId} = req.params

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
      console.log(error)
      next(error)
      
    }
    

  }

  static async patchTask(req, res, next) {
    console.log(req.body, '<<< patch task controller')
    
    try {
      let {TaskId} = req.params

      let newCategoryId = req.body.CategoryId

      console.log({TaskId, prevCategoryId: req.body.CategoryId, newCategoryId})

      await Task.update( {CategoryId: newCategoryId}, {
        where: { id: TaskId }
      })
      
      res.status(200).json({msg: `Task successfully moved`})
    } catch (error) {
      console.log(error)
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
      console.log(error)
      next(error)
    }
  } 

}


module.exports = TaskController