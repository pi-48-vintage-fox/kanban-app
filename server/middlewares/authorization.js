const { Task } = require('../models/index')

function authorization(req, res, next) {
  const id = req.params.id
  console.log(id, 'ini id')
  console.log(req.params, 'ini params')
  console.log(req.body, 'ini body')
  Task.findByPk(id)
  .then(data => {
    if(!data) {
      throw { msg: "Task not found!", status: 404 }
    }
    else if(data.UserId === req.userLogin.id) {
      next()
    }
    else {
      throw { msg: "Not authorized!", status: 401 }
    }
  })
  .catch(err => {
    console.log(err)
    const status = err.status || 500
    const msg = err.msg || "Internal Server Error!"
    res.status(status).json({ error: msg })
  })
}

module.exports = authorization