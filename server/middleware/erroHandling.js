function errorHandling(err, req, res, next) {
  if (err.name == 'SequelizeValidationError' || err.message == "Email cannot be empty!" || err.message == "Must be format email!" || err.message == 'Password cannot be empty' || err.message == 'Cannot be empty') {
      res.status(400).json({
          message: "There is something wrong"
      })
  }  else if (err.message == 'Task not found') {
      res.status(404).json({
          message: "Task not found"
      })
  } else if (err.name == 'Authorization failed!') {
      res.status(err.status).json({message})
  } else if (err.message == 'Unauthorized') {
      res.status(401).json({
          message: "Unauthorized"
      })
  } else if (err.message == '"Wrong email/password!"') {
      res.status(401).json({
          message: "Wrong email/password"
      })
  } else if (err.name.includes('sequelize')) {
      req.status(400).json(err.errors)
  }
}

module.exports = errorHandling;