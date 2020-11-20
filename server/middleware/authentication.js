const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

async function authentication(req, res, next) {
  const { access_token } = req.headers
  try{
    if (!access_token) {
      throw { name: "Authentication Failed", message: 'Wrong email/password!', status: 401}
    } else {
      const decoded = verifyToken(access_token)
      const user = await User.findOne({
        where: {
          email: decoded.email
        }
      })
      if (!user) {
        throw { name: "Authentication Failed", message: 'Wrong email/password!', status: 401}
      } else {
        req.loggedInUser = decoded
        next()
      }
    }
  }
  catch(err) {
    next(err)
  }
}



module.exports = authentication