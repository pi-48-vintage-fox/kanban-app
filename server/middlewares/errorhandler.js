
 const errorHandler = (err, req, res, next) => {

    console.log(err);
    
    let status = 500
    let msg = 'Internal Server Error'

    if(err.name.includes('Sequelize')){
      status = 400
      msg = err.errors[0].message
    }

    switch (err.name) {
      case 'LoginFailed':
        status = err.status
        msg = err.msg
        break;
      case 'Authentication Failed':
        status = err.status
        msg = err.msg
        break;
      case 'Authorization Failed':
        status = err.status
        msg = err.msg
        break;
      case 'Not Found':
        status = err.status
        msg = err.msg
        break;
    }

    res.status(status).json({msg})
    
  }

  module.exports = errorHandler
