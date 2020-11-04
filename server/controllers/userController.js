const { User } = require('../models/index')

class UserController {
  static register(req, res) {
    let obj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User.create(obj)
    .then(data => {
      res.status(201).json({
        name: data.name,
        email: data.email
      })
    })
    .catch(err => {
      res.status(400).json(err)
    })
  }

  static login(req, res) {

  }
}

module.exports = UserController