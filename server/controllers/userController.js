const { User } = require('../models')
const { generateToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcrypt')
const { OAuth2Client } = require('google-auth-library')

class UserController {

  static register (req, res, next) {

    const { username, email, password } = req.body
    let newUser = {
      username,
      email,
      password
    }
    
    User.create(newUser)
      .then(user => {
        res.status(201).json({user: {
          id: user.id,
          username: user.username,
          email: user.email
        }})
      })
      .catch(err => {
        next(err)
      })
  }

  static login (req, res, next)  {

     const {email, username, password} = req.body

     let userObj = {
       email,
       username,
       password
     }

     if(email && ! username){

        User.findOne({
          where: {
            email: userObj.email
          }
        })
          .then(user => {
            if(!user){
                
                throw {msg: `username, email or password is incorrect`, status: 401, name: 'LoginFailed'}

            } else if (!comparePassword(userObj.password, user.password)) {

                throw {msg: `username, email or password is incorrect`, status: 401, name: 'LoginFailed'}
            }
            else {
              const access_token = generateToken({id: user.id, email: user.email})
              res.status(200).json({access_token, username: user.username })
            }
           
          })
          .catch(err => {
            next(err)
          })
        
     } else if(!email && username) {
      User.findOne({
        where: {
          username: userObj.username
        }
      })
      .then(user => {
        if(!user){
            
            throw {msg: `username, email or password is incorrect`, status: 401, name: 'LoginFailed'}

        } else if (!comparePassword(userObj.password, user.password)) {

            throw {msg: `username, email or password is incorrect`, status: 401, name: 'LoginFailed'}
        }
        else {
          const access_token = generateToken({id: user.id, email: user.email})
          res.status(200).json({access_token})
        }
       
      })
      .catch(err => {
        next(err)
      })
     }
  }
  static googleLogin(req, res, next) {

    let { google_access_token } = req.body
    //console.log(google_access_token);
    
    const client = new OAuth2Client('893562878002-5g9hg8d6s2ejsj2ggvji511univq3r8g.apps.googleusercontent.com');
    let email
    client.verifyIdToken({
      idToken: google_access_token,
      audience: '893562878002-5g9hg8d6s2ejsj2ggvji511univq3r8g.apps.googleusercontent.com'
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      email = payload.email
      console.log(email);
      
      return User.findOne({
        where:{
          email : payload.email
        }
      })
    })
    .then(user => {

      if(user){
        const token = generateToken({
          id: user.id,
          email: user.email,
          
        })
        res.status(200).json({
          'access_token' : token,
          username: user.username
        })
      }
      else{
        console.log('<<<');
        
       return User.create({
          email,
          password: 'randomAja',
          username: email.split('@')[0]
        })
      }
    })
    .then(dataUser => {
      let access_token = generateToken({ 
        id: dataUser.id,
        email: dataUser.email,
        
      })
      res.status(200).json({access_token, username: dataUser.username})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController