const { User } = require('../models')
const { generateToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcrypt')

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
              res.status(200).json({access_token})
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
}

module.exports = UserController