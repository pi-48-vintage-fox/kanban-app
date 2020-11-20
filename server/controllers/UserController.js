'use strict'

const { User } = require('../models/index')
const { compareHash } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {

  static async register(req, res, next) {
    try {
      let data = {
        email: req.body.email,
        password: req.body.password
      }
      let user = await User.create(data)
      res.status(201).json({
        id: user.id,
        email: user.email
      })
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

  static async login(req, res, next) {
    try {
      let data = {
        email: req.body.email,
        password: req.body.password
      }
      let user = await User.findOne({
        where: {
          email: data.email
        }
      })
      if (!user) {
        throw { msg: "Email/Password is wrong", status: 404 }
      }
      else if (compareHash(data.password, user.password)) {
        let access_token = signToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({
          msg: "Success",
          access_token
        })
      }
      else {
        throw { msg: "Not authorize", status: 401 }
      }
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  }

  static async googleLogin(req, res, next) {
    const { google_token } = req.body
    const client = new OAuth2Client('975173380509-h06f7llsom0gs78k849snl62pkjvek1m.apps.googleusercontent.com');
    try {
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: '975173380509-h06f7llsom0gs78k849snl62pkjvek1m.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();
      const email = payload.email
      const available = await User.findOne({ where: { email } })
      if (available) {
        let access_token = signToken({ id: available.id, email: available.email })
        res.status(200).json({ access_token, id: available.id, email: available.email })
      } else {
        const newUser = await User.create({
          email,
          password: "randompassword"
        })
        let access_token = signToken({ id: newUser.id, email: newUser.email })
        res.status(200).json({ access_token, id: newUser.id, email: newUser.email })
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController







