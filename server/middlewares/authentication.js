const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

class Authentication {

  static authentication(req, res, next) {
    const { token } = req.headers
    if (!token) {
      res.status(401).json({
        msg: 'Authentication failed'
      })
    } else {
      const decoded = verifyToken(token)
      User.findOne({
        where: {
          email: decoded.email
        }
      })
        .then(data => {
          if (!data) {
            res.status(401).json({
              msg: 'Authentication failed'
            })
          } else {
            req.loggedInUser = decoded
            next()
          }
        })
        .catch(err => {
          next(err)
        })
    }
  }
  
}

module.exports = Authentication
