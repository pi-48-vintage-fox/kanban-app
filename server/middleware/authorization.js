const { Task } = require('../models/index')

function authorization(req, res, next) {
  const { id } = req.params
  Task.findByPk(id)
  .then(data => {
    if (!data) {
      throw { message: "Task not found", status: 401 }
    } else if(data.userId == req.loggedInUser.id) {
      next()
    } else {
      throw { message: "Unauthorized", status: 401 }
    }
  })
  .catch(err => {
    const status = err.status || 500
    const message = err.message || 'Internal server error'
    res.status(status).json({ err: message })
  })
}

module.exports = authorization