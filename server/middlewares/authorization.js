const { Task } = require('../models')

function authorization (req, res, next) {

  console.log('authorization')

  const { TaskId } = req.params

  // console.log({TaskId})

  Task.findByPk(TaskId)
  .then(task => {
    if (!task) {
      // console.log('task not found')
      throw { msg: "Task not found", status: 404 }
    } else {
      // console.log('task found')

      const UserId = req.user.id
  
      if (task.UserId != UserId) {
        throw { msg: "Not authorized", status: 401}
      }
  
      next()
    }
  })
  .catch(err => {
    console.log(err)
    const status = err.status || 500
    const msg = err.msg || 'Internal Server Error'
    res.status(status).send({ status, msg })
  }) 
}

module.exports =  authorization
