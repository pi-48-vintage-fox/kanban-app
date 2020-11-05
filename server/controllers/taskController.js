const { Task } = require('../models/index')

class TaskController {
  static showAll(req, res, next) {
    Task.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }

  static add(req, res, next) {
    const id = req.userLogin.id
    const obj = {
      title: req.body.title,
      category: req.body.category,
      UserId: id
    }
    Task.create(obj)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }

  static changeCat(req, res, next) {
    const id = req.params.id
    Task.findByPk(id)
    .then(() => {
      const cat = req.body.category
      return Task.update({ category: cat }, {
        where: {
          id: id
        }
      })
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }

  static edit(req, res, next) {
    const id = req.params.id
    const obj = {
      title: req.body.title,
      category: req.body.category
    }
    Task.update(obj, {
      where: {
        id: id
      }
    })
    .then(data => {
      res.status(200).json("Successfully edited data!")
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }
}

module.exports = TaskController