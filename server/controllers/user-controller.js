const { User } = require("../models/index")
const { createJWT } = require("../helper/jwt")
const { comparePassword } = require("../helper/bcrypt")
const {OAuth2Client} = require('google-auth-library');


class UserController {
    static register(req,res) {
        let data = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(data, {
            returning: true
        })
        .then(result => {
            if (!result) {
                throw {message: "Email already exists", status: 401}
            } else {
                let data = {
                    id: result.id,
                    email: result.email
                }
                let token = createJWT(data)
                res.status(201).json({data, access_token: token})
            }
        })
        .catch(err => {
            let status = err.status || 500
            let message = err.message || "Internal server error"
            if (err.name == "SequelizeUniqueConstraintError") {
                message = err.errors[0].message
            }
            res.status(status).json(message)  
        })
    }
//=========================================
    static login(req, res) {
        let data = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(data,'dari body');
        User.findOne({
            where: {
                email: data.email
            }
        })
        .then(result => {
            if (!result) {
                throw { message: "Email / password is wrong ..!", status: 404}
            } else if(comparePassword(data.password, result.password)) {
                let data = {
                    id: result.id,
                    email: result.email
                }
                let token = createJWT(data)
                res.status(200).json({access_token: token})
            } else {
                throw { message: "Email / password is wrong ..!", status: 404}
            }
        })
        .catch(err => {
            let status = err.status || 500
            let message = err.message || "Internal server error"
            if (err.name == "SequelizeUniqueConstraintError") {
                message = err.errors[0].message
            }
            res.status(status).json(message)  
        })
    }
//=========================================
    static googleLogin(req, res) {

        let token = req.body.google_access_token
        const client = new OAuth2Client(process.env.CLIENT_ID);

        let newEmail;
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            let payload = ticket.getPayload()
            newEmail = payload.email
            return User.findOne({
                where: {
                    email: newEmail
                }
            })
        })
        .then(result => {
            console.log(result,"result");
            if (result) {
                return result
            } else {
                let objData = {
                    email: newEmail,
                    password: "loginGoogle"
                }
                return User.create(objData)
            }
        })
        .then(dataUser => {
            let data = {
                id: dataUser.id,
                email: dataUser.email
            }
            let access_token = createJWT(data)
            res.status(200).json({access_token: access_token})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController