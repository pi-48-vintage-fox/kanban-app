const { Task } = require('../models/index')


class taskController {
  static create(req, res, next) {
    // console.log(req.loggedInUser.id);
    const userId = +req.loggedInUser.id
    const obj = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      userId
    }
    // console.log(obj);
    Task.create(obj)
    .then(data => {
      console.log(data);
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  } 


  static showAll(req, res, next) {
    Task.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  } 


  static update(req, res) {
    let id = req.params.id
    let obj = {
      title: req.body.title,
      description: req.body.description
    }
    Task.update(obj, {
      where: {
        id: +id
      }
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }


  static updateCategory(req, res) {
    let id = req.params.id
    Task.update({
      category: req.body.category
    },{
      where: {
        id: +id
      }
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }


  static delete(req, res, next) {
    let id = req.params.id
    Task.destroy({
      where: {
        id: +id
      }
    })
    .then(data => {
      res.status(200).json({ message: "Success delete task"})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = taskController