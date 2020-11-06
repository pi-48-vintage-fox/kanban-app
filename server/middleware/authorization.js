const {Task} = require('../models/index')

function authorization(req, res, next) {
    const id = req.params.id
    Task.findByPk(id)
    .then(data => {
        if(!data){
            let err = {
                name: 'Not Found'
            }
            throw next(err)
        }
        else if(data.UserId === req.loggedInUser.id){
            next()
        }
        else{
            let err = {
                name: 'Authorization failed'
            }
            throw next(err)
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization