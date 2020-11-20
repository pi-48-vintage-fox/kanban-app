const { Task } = require('../models/index')

async function authorization(req, res, next) {
  const { id } = req.params
  let userId = +req.loggedInUser.id
  try {
    const task = await Task.findByPk(+id)
    console.log(id);
    console.log(task.userId);
    console.log(userId);
    if (!task) {
      throw {name: 'NotFound', message: 'Task not found', status: 401}
    } else if (task.userId == userId) {
      return next()
    } else {
      throw {name: "Authorization Failed", message: "You don't have access", status: 401}
    }
  }
  catch(err) {
    next(err)
  }
}

module.exports = authorization