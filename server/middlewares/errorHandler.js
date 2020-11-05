function errorHandler(err, req, res, next) {
    if (err.name == 'SequelizeValidationError' || err.name == 'validation error' || err.name == 'Title cannot empty') {
        res.status(400).json({
            message: "Oops! Validation error"
        })
    }  else if (err.name == 'not found') {
        res.status(404).json({
            message: "Oops! there was an error"
        })
    } else if (err.name == 'auth failed') {
        res.status(401).json({
            message: "Wrong email or password"
        })
    } else if (err.name == 'unauthorized') {
        res.status(401).json({
            message: "Unauthorized access"
        })
    }
}

module.exports = errorHandler;