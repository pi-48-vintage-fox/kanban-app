const { Task } = require('../models/index')

class TaskController {
  static findAll(res, req, next) {
    Task.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }

  static add(res, req, next) {
    let id = req.params.id
    let obj = {
      title: req.body.title,
      category: req.body.category
    }
    Task.create(obj)
    .then(data => {
      res.status(201).json({
        id: data.id,
        title: data.title,
        category: data.category
      })
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }

  static changeCat(req, res, next) {
    let id = req.params.id
    let category = req.body.category
    Task.findByPk(id)
    .then(() => {
      return Task.update({ category: category }, {
        where: {
          id: id
        }
      })
    })
    .then(() => {
      res.status(200).json("Successfully changed category!")
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }

  static edit(req, res, next) {
    let id = req.params.id
    let obj = {
      title: req.body.title,
      category: req.body.category
    }
    Task.update({
      where: {
        id: id
      }
    })
    .then(() => {
      res.status(200).json("Successfully edited data!")
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }
}

module.exports = TaskController