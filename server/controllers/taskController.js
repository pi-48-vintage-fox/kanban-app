const { Task } = require('../models/index')

class TaskController {
  static showAll(req, res, next) {
    Task.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static add(req, res, next) {
    const id = req.userLogin.id
    const obj = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      UserId: id
    }
    Task.create(obj)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static changeCat(req, res, next) {
    const id = req.params.id
    Task.findByPk(id)
    .then(data => {
      let cat = ''
      if(data.category == 'Backlog') {
        cat = 'Todo'
      }
      else if(data.category == 'Todo') {
        cat = 'Doing'
      }
      else if(data.category == 'Doing') {
        cat = 'Done'
      }
      else if(data.category == 'Done') {
        cat = 'Backlog'
      }
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
      next(err)
    })
  }

  static edit(req, res, next) {
    const id = req.params.id
    const obj = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description
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
      next(err)
    })
  }

  static delete(req, res, next) {
    const id = req.params.id
    Task.destroy({
      where: {
        id: id
      }
    })
    .then(() => {
      console.log("Masuk sini kok boi")
      res.status(200).json("Successfully deleted task!")
    })
    .catch(err => {
      console.log("Error coi")
      next(err)
    })
  }
}

module.exports = TaskController