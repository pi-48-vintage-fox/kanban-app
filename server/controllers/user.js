'use strict'
const { compare } = require('../helpers/bcrypt')
const { User } = require('../models/index')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static async register(req, res, next) {
        const newAccount = {
            email: req.body.email,
            password: req.body.password,
        }
        try {
            const data = await User.create(newAccount)
            res.status(201).json({ email: data.email })
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        const account = {
            email: req.body.email,
            password: req.body.password,
        }

        try {
            const data = await User.findOne({
                where: {
                    email: account.email
                }
            })
            if (!data) {
                next({ name: 'Wrong email/password' })
            }
            else if (!compare(account.password, data.password)) {
                next({ name: 'Wrong email/password' })
            }
            else {
                const access_token = signToken({
                    id: data.id,
                    email: data.email
                })
                res.status(200).json({
                    id: data.id,
                    email: data.email,
                    access_token: access_token
                })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static googleLogin(req, res, next) {
        let email = ""
        const client = new OAuth2Client(process.env.CLIENT_ID);
        console.log(client)
        client.verifyIdToken({
            idToken: req.headers.google_access_token,
            audience: process.env.CLIENT_ID,
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            email = payload.email
            return User.findOne({ where: { email } })
        })
        .then(user => {
            console.log('xxx')
            if (!user) {
                let obj = {
                    email: email,
                    password: "randompassword",
                }
                return User.create(obj)
                } else {
                    return user
                }
            })
            .then(user => {
                let access_token = signToken({ id: user.id, email: user.email })
                console.log({
                    id: user.id,
                    email: user.email,
                    access_token: access_token
                })
                res.status(200).json({
                    id: user.id,
                    email: user.email,
                    access_token: access_token
                })
                
            })
            .catch(err => {
               console.log(err)
            })
    }

}
module.exports = UserController
