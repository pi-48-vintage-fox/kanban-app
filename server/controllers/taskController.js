const { Task, User } = require('../models')

class TaskController {

  static postTask(req, res, next) {
    const UserId = req.loggedInUser.id
    const { title, description, category } = req.body
    Task.create({
      title, description, category, UserId
    })
      .then(data => {
        res.status(200).json({
          id: data.id,
          title: data.title,
          category: data.category
        })
      })
      .catch(err => {
        console.log(err, "<<<< masuk ke error")
        next(err)
      })
  }

  static getTask(req, res, next) {
    Task.findAll({
      include: [User]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static getTaskById(req, res, next) {
    const id = req.params.id
    Task.findByPk(id, {
      include: [User]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static putTask(req, res, next) {
    const id = req.params.id
    const { title, description, category } = req.body
    Task.update({
      title, description, category
    }, {
      where: {
        id
      },
      returning: true
    })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }

  static patchTask(req, res, next) {
    const id = req.params.id
    const { category } = req.body
    Task.update({
      category
    }, {
      where: {
        id
      },
      returning: true
    })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteTask(req, res, next) {
    const id = req.params.id
    Task.destroy({
      where: {
        id
      }
    })
      .then(data => {
        if (data === 0) {
          res.status(400).json({
            message: 'Data not found'
          })
        } else {
          res.status(200).json({
            message: 'Delete completed'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = TaskController