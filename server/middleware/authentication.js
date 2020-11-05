const { decode } = require('jsonwebtoken')
const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

async function authentication(req, res, next) {
  const { access_token } = req.headers
  try{
    if (!access_token) {
      throw { message: "Authentication failed!", status: 401}
    } else {
      const decoded = verifyToken(access_token)
      const user = await User.findOne({
        where: {
          email: decoded.email
        }
      })
      if (!user) {
        throw { message: "Authentication failed!", status: 401}
      } else {
        req.loggedInUser = decoded
        next()
      }
    }
  }
  catch(err) {
    const status = err.status || 500
    const message = err.message || 'Internal server error'
    res.status(status).json({ err: message })
  }
}

module.exports = authentication