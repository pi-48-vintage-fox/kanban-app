const { Task } = require("../models/index")

function authorization(req, res, next) {
    let userId = req.isLogin

    Task.findOne({
        where: {
            id: +req.params.id
        }
    })
    .then(result => {
        if(!result) {
            throw { message: "Data Not Found", status: 404 }
        }
        else if (result.UserId == userId) {
            next()
        } else {
            throw { message: "NotAuthorize", status: 401 }
        }
    })
    .catch(err => {
        let status = err.status || 500
        let message = err.message || "Internal server error"
        res.status(status).json(message)  
    })

}

module.exports = authorization