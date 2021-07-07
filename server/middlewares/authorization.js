const { Task } = require('../models')

class Authorization {

  static authorization(req, res, next) {
    const { id } = req.params
    Task.findAll(id)
      .then(data => {
        if (!data) {
          res.status(404).json({
            msg: 'Task not fount'
          })
        } else if (data.UserId === req.loggedInUser.id) {
          next()
        } else {
          res.status(401).json({
            msg: 'Not authorized'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = Authorization