const { Task, Category } = require('../models')

class TaskController {

  static postTask(req, res, next) {
    const UserId = req.loggedInUser.id
    const obj = {
      title: req.body.title,
      tag: req.body.tag,
      CategoryId: 1,
      UserId,
    }
    Task.create(obj)
      .then(data => {
        res.status(200).json({
          id: data.id,
          title: data.title,
          tag: data.tag
        })
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static getTask(req, res, next) {
    Task.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static getCategory(req, res, next) {
    Category.findAll({
      include: [ Task ]
    })
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(err => {
        next(err)
      })
  }

  static getTaskById(req, res, next) {
    const UserId = req.loggedInUser.id
    Task.findByPk(UserId)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static putTask(req, res, next) {
    const id = +req.params.id
    const obj = {
      title: req.body.title,
      tag: req.body.tag,
      category: req.body.cateory
      
    }
    Task.update(obj, {
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
    const id = +req.params.id
    const obj = {
      CategoryId: req.body.CategoryId
    }
    Task.update(obj, {
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
    const id = +req.params.id
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
