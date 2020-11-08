const { verifyToken } = require('../helpers/auth')
const { User } = require('../models')

async function authentication(req, res, next) {
  console.log(req.params, '<<< req params authentication')
  try {
    const access_token = req.headers.access_token
    if (!access_token) {
      throw { msg: 'Not authenticated', status: 401 }
    }

    const decoded = verifyToken(access_token)

    console.log({ decoded })

    const user = await User.findByPk(decoded.id)

    if (!user) {
      console.log('user not found')
      throw { msg: 'Not authenticated', status: 401 }
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = authentication
