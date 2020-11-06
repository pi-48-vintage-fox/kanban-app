'use strict'

const { User } = require('../models/index')
const { compareHash } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {

  static async register(req, res, next){
    try {
      let data = {
        email : req.body.email,
        password : req.body.password
      }
      let user = await User.create(data)
      res.status(201).json({
        id : user.id,
        email : user.email
      })
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }    
  }

  static async login(req, res, next){
    try {
      let data = { 
        email : req.body.email,
        password : req.body.password
      }
      let user = await User.findOne({
        where : {
          email : data.email
        }
      })
      if (!user) {
        throw { msg: "Email/Password is wrong", status : 404 }
      }      
      else if (compareHash(data.password, user.password)) {
        let access_token = signToken({
          id: user.id,
          email : user.email
        })
        res.status(200).json({
          msg : "Success",
          access_token
        })
      }
      else{
        throw { msg : "Not authorize", status: 401 }
      }
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  }

  static googleLogin(req, res, next){
    const client = new OAuth2Client('975173380509-5itfn87boa8uknjjlugdcpfq4g8bsm9g.apps.googleusercontent.com')
    let email = ""
    client.clientIdToken({
      idToken : req.headers.google_access_token,
      audience : '975173380509-5itfn87boa8uknjjlugdcpfq4g8bsm9g.apps.googleusercontent.com'
    })
    .then(ticket => {
      let payload = ticket.getPayload()
      email = payload.email
      return User.findOne({
        where : { email }
      })
      
    })
    .then(user => {
      if(!user) {
        let obj = {
          email : email,
          password: "randompassword"
        }
        console.log(obj)
        return User.create(obj)
      }
      else {
        return user
      }
    })
    .then(dataUser => {
      let access_token = signToken({ id : dataUser.id, name : dataUser.name, email : dataUser.email})
      return res.status(200).json({access_token})
    })
    .catch(error => {
      res.status(400).json(error)
    })
  }
}

module.exports = UserController