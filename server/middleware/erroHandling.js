function errorHandling(err, req, res, next) {
    let message = err.message
    if(err.name == 'Authentication Failed') {
        res.status(400).json({message})
    }
    else if(err.errors[0].validatorKey == 'notEmpty') {
        res.status(400).json({ message: 'Field Cannot be empty'})
    }
    else if(err.errors[0].validatorKey == 'isEmail') {
        res.status(400).json({ message: 'Field must be format email' })
    }
    else if (err.name == 'Authorization Failed') {
        res.status(401).json({ message })
    } else if (err.name == 'NotFound') {
        res.status(401).json({ message })
    }
    else {
        res.status(500).json({ message: 'Internal server error'})
    }
}

module.exports = errorHandling;