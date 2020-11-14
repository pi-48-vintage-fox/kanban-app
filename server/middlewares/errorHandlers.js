function errorHandlers(err,req,res, next) {
    console.log(err, "ini di error handler")
    let message = err.message || "Server Internal Error"
    let status = err.response || 500
    if(err.name === "Unauthorized") {
        message = err.msg
        status = 401
    } else if (err.name === "SequelizeValidationError") {
        message = err.errors.map(errors => {
            return " " + errors.message
        })
        status = 400
    } else if (err.name === "SequelizeUniqueConstraintError") {
        message = err.message + ", email already use"
        status = 400
    }
    res.status(status).json({message})
}

module.exports = errorHandlers