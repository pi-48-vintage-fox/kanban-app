'use strict'
const { User } = require('../models')
const { decodeToken } = require('../helpers/jwt')

async function authenticate(req, res, next) {
  try {
    let access_token = req.headers.access_token
    if (!access_token) throw { msg: "Not Authenticated", status: 401 }

    let decoded = decodeToken(access_token)

    let user = await User.findOne({
      where: {
        id: decoded.id,
        email: decoded.email
      }
    })

    if (!user) throw { msg: "Not Authenticated", status: 401 }
    req.loggedInUser = user
    next()

  } catch (err) {
    next(err)
  }
}

module.exports = authenticate
