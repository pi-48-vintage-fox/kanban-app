const { Task, User } = require("../models/index")
const { decodeJWT } = require("../helper/jwt")

function authentication(req, res, next) {
    let access_token = decodeJWT(req.headers.access_token)
    User.findOne({
        where: {
            email: access_token.email
        }
    })
    .then(result => {
        if (!result) {
            throw { message: "Not Alowed", status: 404 }
        } else {
            req.isLogin = access_token.id
            next()            
        }
    })
    .catch(err => {
        let status = err.status || 500
        let message = err.message || "Internal server error"
        res.status(status).json(message)
    })
}

module.exports = authentication