'use strict'

const { Task, User, TaskTag} = require("../models")

class TaskController{

  static async index(req,res,next){
    try {

      let tasks = await Task.findAll()
      
      res.status(200).json({
        msg: "Success",
        tasks
      })

    } catch (err) {
      next(err)
    }
  }

  static async insert(req,res,next){
    try {
      let data = {
        title: req.body.title,
        descriptions: req.body.descriptions,
        CategoryId: req.body.CategoryId
      }

      let task = await Task.create(data)

      res.status(200).json({
        msg: "Task created",
        task
      })
      
    } catch (err) {
      next(err)
    }
  }

  static async update(req,res,next){
    try {
      let id = req.params.id
      let data = {
        title: req.body.title,
        descriptions: req.body.descriptions
      }
      let task = await Task.update(data,{
        where:{
          id
        }
      })
      if(!task[0]) throw {msg : "Task with id " + id + " Does not exist", status : 400}
      res.status(200).json({
        msg: "Task Updated",
      })

    } catch (err) {
      next(err)
    }
  }

  static async addTag(req,res,next){
    try {
      let id = req.params.id
      let data = {
        name: req.body.name,
        color: req.body.color,
        TaskId: id
      }
      
      let task = await TaskTag.create(data)

      res.status(200).json({
        msg: "Tag Added",
        task
      })

    } catch (err) {
      next(err)
    }
  }
  
  static async updateTaskCategory(req,res,next){
    try {
      let id = req.params.id
      let data = {
        CategoryId: req.body.CategoryId
      }

      let task = await Task.update(data,{
        where:{
          id
        }
      })
      if(!task[0]) throw {msg : "Task with id " + id + " Does not exist", status : 400}
      res.status(200).json({
        msg: "Task updated (category change)"
      })
    } catch (err) {
      next(err)
    }  
  }

  static async destroy(req,res,next){
    try { 
      let id = req.params.id

      let task = await Task.findByPk(id)
      task.destroy()
      res.status(200).json({
        msg: "Task deleted",  
        task      
      })
    } catch (err) {
      next(err)
    }
  }

}

module.exports = TaskController