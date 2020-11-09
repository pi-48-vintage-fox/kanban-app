const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    let obj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User.create(obj)
    .then(data => {
      res.status(201).json({
        name: data.name,
        email: data.email
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static login(req, res, next) {
    let obj = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: obj.email
      }
    })
      .then(data => {
        if(!data) {
          res.status(401).json({
            message: 'Wrong email or password!'
          })
        }
        else if(!comparePassword(obj.password, data.password)) {
          res.status(401).json({
            message: 'Wrong email or password!'
          })
        }
        else {
          const access_token = signToken({
            id: data.id,
            email: data.email
          })
          res.status(200).json({
            access_token
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static googleLogin(req, res, next) {
    let { google_token } = req.body
    const client = new OAuth2Client(process.env.G_CLIENT_ID);
    let email = ''
    let name = ''
    client.verifyIdToken({
      idToken: google_token,
      audience: process.env.G_CLIENT_ID
    })
    .then(ticket => {
      let payload = ticket.getPayload()
      name = payload.name
      email = payload.email
      return User.findOne({where : {email: payload.email}})
    })
    .then(user => {
      if(user) {
        return user
      }
      else {
        let obj = {
          name,
          email,
          password: 'hahaha'
        }
        return User.create(obj)
      }
    })
    .then(userData => {
      let access_token = signToken({id: userData.id, email: userData.email})
      res.status(200).json({access_token})
    })
    .catch(err => {
      console.log(err)
    })
  }
}

module.exports = UserController