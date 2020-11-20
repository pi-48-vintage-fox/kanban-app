'use strict'
const { Task, User, Category } = require('../models/index')

class TaskController {

  static async show(req, res){
    try {
      const data = await Task.findAll({
        include : [User, Category]
      })
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async add(req,res){
    try {
      let params = {
        title : req.body.title,
        description : req.body.description,
        UserId : req.UserId,
        CategoryId : 1
      }
      const data = await Task.create(params)
      console.log(data)
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async edit(req,res){
    try {
      let params = {
        title : req.body.title,
        description : req.body.description
      }
      const data = await Task.update(params, {
        where : {
          id : req.params.id
        }
      })
      res.status(200).json({msg : "task has been updated"})
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async delete(req,res){
    try {
      const data = await Task.destroy({
        where : {
          id : req.params.id
        }
      })
      res.status(200).json({msg : "task has been deleted"})
    } catch (error) {
      res.status(400).json(error)
    }
  }

  static async move(req,res){
    try {
      let params = {
        CategoryId : req.body.CategoryId
      }
      const data = await Task.update(params, {
        where : {
          id : req.params.id
        }
      })
      res.status(201).json({msg : "Task has been updated"})
    } catch (error) {
      res.status(500).json(error)
    }
  }
}


module.exports = TaskController