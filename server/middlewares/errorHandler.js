module.exports = (err, req, res, next) => {
  // console.log(JSON.stringify(err,null,2)) 
  console.log('err.status:', err.status)
  console.log('err.msg:', err.msg)
  console.log('err.name:', err.name)
  console.log('err.errors:', err.errors)
  
  let status = err.status || 500
  let msg = err.msg || 'Internal Server Error'

  if (err.name) {

    if (err.name.includes('Sequelize')) {
      status = 400
      if (err.errors) {
      // msg = err.name + ';' + err.errors.map(error => error.message).join(';')
        msg = err.errors.map(error => error.message).join(';')

      }
    }

    switch(err.name){
      case 'NotFoundError':
      case 'ForbiddenError':
      case 'UnauthorizedError':
      case 'BadRequestError': 
        status = err.status
        msg = err.message
        break;
      case 'JsonWebTokenError': 
        status = 401
        msg = 'Failed to authenticate'
      case 'TokenExpiredError': 
        status = 401
        msg = 'Access token is expired'
        break;
    }
  }

  res.status(status).json({ msg })

}