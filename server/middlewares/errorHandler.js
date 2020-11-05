class Error {
  static handle(err, req, res, next) {
    let status = 500;
    let message = 'Internal Server Error';
    if(err.name === 'SequelizeValidationError' || err.name ==='SequelizeUniqueConstraintError') {
      status = 400;
      message = [];
      err.errors.forEach(element => {
        message.push(element.message);
      });
      message = message.join(', ')
    } else if(err.name === 'UserUnauthorized' || err.name ==='JsonWebTokenError') {
      status = 401;
      message = 'User Unauthorized';
    } else if(err.name === 'NotFound') {
      status = 404;
      message = 'Error, not found';
    } else if(err.name === 'WrongEmailPassword') {
      status = 401;
      message = 'Wrong email/password';
    } else if(err.name === 'TasksDetected') {
      status = 400;
      message = 'Cannot delete category with tasks in it'
    }

    res.status(status).json({message})
  }
}

module.exports = Error;