const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcryptjs')
const { signToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

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
      throw { name: 'Authentication Failed', message: "Wrong email/password!" }
    } else if(!comparePassword(obj.password, data.password)) {
      throw { name: 'Authentication Failed', message: "Wrong email/password!" }
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
  console.log(google_access_token);
  let email
  const client = new OAuth2Client('978195228129-r2ffu0o0dg6930uobrtpiaki5vg9r3q4.apps.googleusercontent.com');
  client.verifyIdToken({
    idToken: google_access_token,
    audience: '978195228129-r2ffu0o0dg6930uobrtpiaki5vg9r3q4.apps.googleusercontent.com'
  })
    .then(ticket => {
      console.log(ticket);
      let payload = ticket.getPayload()
      email = payload.email
      console.log(email);
      return User.findOne({
        where: {
          email: payload.email
        }
      })
    })
    .then(user => {
      if (user) {
        const access_token = signToken({
          id: user.id,
          email: user.email
        })
        res.status(201).json({access_token})
      } else {
        // let userObj = {
        //   email,
        //   password: 'randomaja'
        // }
        return User.create({
          email,
          password: 'randomaja'
        })
      }
    })
    then(dataUser => {
      let access_token = signToken({
        id: dataUser.id,
        email: dataUser.email
      })
      res.status(200).json({access_token})
    })
    .catch(err => {
      next(err)
    })

  
}

}

module.exports = userController