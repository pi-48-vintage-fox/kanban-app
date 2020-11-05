const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static Register(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(result => {
                if (result) {
                    let err = {
                        msg: 'Email Already Exist'
                    }
                    throw err
                }
                else {
                    return User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    })
                }
            })
            .then(result => {
                let msg = {
                    message: 'Register Success!!',
                    id: result.id,
                    name: result.name,
                    email: result.email
                }
                return res.status(201).json(msg)
            })
            .catch(err => {
                return next(err)
            })
    }

    static Login(req, res, next) {
        const loginData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: loginData.email
            }
        })
            .then(user => {
                if (!user) {
                    return next({
                        name: "BadRequest",
                        message: 'Wrong email/password'
                    })
                } else if (!comparePass(loginData.password, user.password)) {
                    return next({
                        name: "BadRequest",
                        message: 'Wrong email/password'
                    })
                } else {
                    let data = {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                    const access_token = signToken(data, { expiresIn: 60 * 60 })
                    let payload = {
                        access_token                    }
                    return res.status(200).json(payload)
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = ''
        client.verifyIdToken({
            idToken: req.headers.google_access_token,
            audience: process.env.CLIENT_ID,
        })
            .then(ticket => {
                let payload = ticket.getPayload()
                email = payload.email
                return User.findOne({ where: { email } })
            })
            .then(user => {
                if (!user) {
                    var userObj = {
                        email: email,
                        password: 'randompassword'
                    }
                    return User.create(userObj)
                } else {
                    return user
                }
            })
            .then(user => {
                const access_token = signToken({ id: user.id, email: user.email })
                return res.status(201).json({ message: 'Login with google successfully', access_token })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = UserController