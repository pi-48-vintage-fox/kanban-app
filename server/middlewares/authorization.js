const { Task } = require('../models')

class Authorization {

  static authorization(req, res, next) {
    const { id } = req.params
    console.log(req.loggedInUser, "<<< ini req.loggedinuser");
    Task.findByPk(id)
      .then(data => {
        if (!data) {
          res.status(404).json({
            msg: 'Task not found'
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