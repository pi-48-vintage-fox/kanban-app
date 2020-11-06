const { Task } = require('../models/index')


class taskController {
  static create(req, res, next) {
    // console.log(req.loggedInUser.id);
    const userId = req.loggedInUser.id
    let obj = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      userId
    }
    Task.create(obj)
    .then(data => {
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
    let id = +req.params.id
    const userId = req.loggerInUser.id
    let obj = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description
    }
    Task.update(obj, {
      where: {
        id: id,
        userId
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
    let id = +req.params.id
    let obj = {
      category: req.body.category
    }
    Task.update({
      where: {
        id: id
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
    let id = +req.params.id
    Task.destroy({
      where: {
        id: id
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