function errorHandling(err, req, res, next) {
  if (err.message == 'SequelizeValidationError' || err.message == "Email cannot be empty!" || err.message == "Must be format email!" || err.message == 'Password cannot be empty') {
      res.status(400).json({
          message: "There is something wrong"
      })
  }  else if (err.message == 'Task not found') {
      res.status(404).json({
          message: "Task not found"
      })
  } else if (err.message == 'Authenticaion failed!') {
      res.status(401).json({
          message: "Wrong email or password"
      })
  } else if (err.message == 'Unauthorized') {
      res.status(401).json({
          message: "Unauthorized"
      })
  } else if (err.message == '"Wrong email/password!"') {
      res.status(401).json({
          message: "Wrong email/password"
      })
  }
}

module.exports = errorHandling;