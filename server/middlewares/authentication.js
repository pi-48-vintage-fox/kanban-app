const { verifyToken } = require('../helpers/auth')
const { User } = require('../models')

async function authentication (req, res, next) {
  try {
    // console.log(req.headers)
    const access_token = req.headers.access_token
    if (!access_token) {
      console.log('no access token')
      throw { msg: 'Not authenticated', status: 401}
    } 

    const decoded = verifyToken(access_token)

    console.log({decoded})

    const user = await User.findOne({
      where: { email : decoded.email }
    })

    if (!user) {
      console.log('user not found')
      throw { msg: 'Not authenticated', status: 401}
    } else {

      req.user = decoded
      next()
    }
  } catch (err) {
    console.log(err)
    next(err)
  }

}

module.exports = authentication

