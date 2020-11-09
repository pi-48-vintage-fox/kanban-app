module.exports = function (err, req, res, next) {
  console.log(err)
  let status = err.status || 500
  let msg = err.name || 'Internal Server Error'
  if(err.name === 'SequelizeValidationError') {
      status = 400
      msg = err.errors[0].message
  }
  res.status(status).json({
      msg
  })
}