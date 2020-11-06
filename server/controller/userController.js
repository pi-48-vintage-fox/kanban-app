const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcryptjs')
const { signToken } = require('../helpers/jwt')

class userController {
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
    if (!data) {
      throw {message: "Wrong email/password!"}
    } else if(!comparePassword(obj.password, data.password)) {
      throw {message: "Wrong email/password!"}
    } else {
      const access_token = signToken({
        id: data.id,
        email: data.email
      })
      res.status(200).json({access_token})
    }
  })
  .catch(err => {
    next(err)
  })


}

static register(req, res, next) {
  let obj = {
    email: req.body.email, 
    password: req.body.password
  }
  User.create(obj)
  .then(data => {
    res.status(201).json({
      id: data.id,
      email: data.email
    })
  })
  .catch(err => {
    next(err)
  }) 
}

static googlelogin(req, res, next) {
  let { google_access_token } = req.body
  let email
      const client = new OAuth2Client(process.env.CLIENT_ID);
      client.verifyIdToken({
          idToken: google_access_token,
          audience: process.env.CLIENT_ID
      })
      .then(ticket => {
          let payload = ticket.getPayload()
          email = payload.email
          return User.findOne({
              where: {
                  email: payload.email
              }
          })
      })
    .then(user => {
      if (user) {
        return user
      } else {
        let userObj = {
          email,
          password: 'randomaja'
        }
        return User.create(userObj)
      }
    })
    then(dataUser => {
      let access_token = signToken({
        id: dataUser.id,
        email: dataUser.email
      })
      return res.status(200).json({access_token})
    })
    .catch(err => {
      console.log(err);
    })

  
}

}

module.exports = userController