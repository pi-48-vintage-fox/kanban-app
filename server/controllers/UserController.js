'use strict'

const { compareHash, makeHash } = require("../helpers/hash")
const { signToken } = require("../helpers/jwt")
const { User } = require("../models")
const { OAuth2Client }= require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {

  static async oauth(req,res,next){
    try {
      let token = req.body.data.token
      const tiket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
      })
      const payload = tiket.getPayload()
      let user = await User.findOne({where:{email:payload.email}})
      if(!user){
        let data = {
          email : payload.email,
          password : makeHash("asdkoi4")
        }
        let createUser = await User.create(data)
        const access_token = signToken({
          id : createUser.id,
          email: createUser.email
        })
        req.loggedInUser = createUser
        res.status(200).json({
          msg:"success",
          access_token
        })
      }
    } catch (err) {
      next(err)
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

      if (!user) throw { msg: "Wrong email/password", status: 401 }

      const passwordMatch = compareHash(data.password, user.password)

      if (passwordMatch) {
        const token = signToken({
          id: user.id,
          email: user.email
        })
        req.loggedInUser = user
        res.status(200).json({
          access_token: token
        })
      } else {
        throw { msg: "Wrong email/password", status: 401 }
      }
    } catch (err) {
      next(err)
    }
  }

  static async register(req, res, next) {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password,
        OrganizationId : 1
      }
      if (!data.password) throw { msg: "Please fill in your password", status: 400 }
      let user = await User.create(data)
      let token = signToken({
        id: user.id,
        email: user.email
      })
      console.log(token)
      res.status(200).json({
        msg: "Regstration Success",
        access_token: token
      })
    } catch (err) {
      next(err)
    }
  }

  static async assign(req, res, next) {
    try {
      let id = req.loggedInUser.id
      let data = {
        OrganizationId : +req.body.OrganizationId
      }

      let user = await User.findByPk(id)
      user.OrganizationId = data.OrganizationId
      user.save()
      res.status(200).json({
        msg: "Success asign user to Organization",
        user
      })
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = UserController