const {User}  = require('../models/index')
const {hashPassword, comparePassword} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/jwt')

class UserController {

    static register (req, res, next) {
        const payload = {
            email: req.body.email,
            password: hashPassword(req.body.password),
            name: req.body.name
        }
        User.create(payload)
        .then(user => {
            let data = {
                id: user.id,
                email: user.email,
                name: user.name
            }
            let access_token = signToken(data)
            res.status(201).json({access_token, name: data.name})
        })
        .catch(err => {
            next(err)
        })
    }

    static login (req, res, next) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: payload.email
            }
        })
        .then(user => {
            if(!user || !comparePassword(payload.password, user.password)){
                let err = {
                    name: 'WrongEmailPassword'
                }
                throw next(err)
            }
            else{
                let data = {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
                let access_token = signToken(data)
                res.status(201).json({access_token, name: data.name})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static googleLogin (req, res, next) {
        
    }

}

module.exports = UserController