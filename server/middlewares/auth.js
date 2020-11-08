const {
    verifyToken
} = require('../helpers/jwt')
const {
    User,
    Task
} = require('../models')

function authentication(req, res, next) {
    const {
        access_token
    } = req.headers
    if (access_token) {
        // console.log(access_token)
        req.userData = verifyToken(access_token)
        User.findByPk(req.userData.id)
            .then((data) => {
                console.log(data)
                if (!data) {
                    res.status(404).json({
                        name: "NotFound",
                        message: "Data Not Found"
                    })
                } else {
                    next()
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })

    } else {
        res.status(401).json({
            "name": "NotFound",
            "message": "Unauthorized"
        })
    }
}

function authorization(req, res, next) {
    Task.findByPk(req.params.id)
        .then((data) => {
            if (!data) {
                res.status(404).json({
                    message: "Data Not Found"
                })
            } else if(data.UserId !== req.userData.id){
                res.status(401).json({
                    message: "You dont have access"
                })
            } else {
                next()
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err
            })
        })
}

module.exports = {
    authentication,
    authorization
}