'use strict'

const { compareHash } = require("../helpers/hash")
const { signToken } = require("../helpers/jwt")
const { User } = require("../models")
class UserController {

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