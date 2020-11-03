const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const { User, Organization } = require('../models')
const { comparePassword, signToken } = require('../helpers/auth')

class UserController {

  static async googleLogin(req, res, next) {

    const token = req.body.token
    // console.log({token})


    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    console.log({payload})

    let user = {
      name: payload.name,
      email: payload.email,
      password: "Hacktiv8",
      avatarUrl: payload.picture
    }
    
    // console.log({user})

    const data = await User.findOne({where : { email: user.email }})

    if (data) {

      // console.log(data.toJSON())
      // console.log('^----- user sdh ada di database')
      const access_token = signToken({
        id: data.id,
        email:data.email
      })
      res.status(200).json({access_token})

    } else {
      console.log('user belum ada di database, bikin sekarang')
      
      const newUser = await User.create(user)

      // console.log(newUser.toJSON())
      // console.log({id: newUser.id, email: newUser.email})
      // console.log('^----- data user yang akan dikasi access token')


      const access_token = signToken({
        id: newUser.id,
        email:newUser.email
      })
      res.status(200).json({access_token})
    }

    } catch (error) {
      console.log(error, '\n^----- google login error')
      next(error)
    }

  }

  static async register(req, res, next) {

    console.log(req.body)
    console.log('register')
    
    try {
      const payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      }

      const user = await User.create(payload)

      console.log({user})

      res.status(201).json({
        message: 'Account registration successful'
      })
      
    } catch (error) {
      console.log(error, '\n^----- error registering user')
      next(error)
    }

  }

  static async login(req, res, next) {

    try {
      const payload = {
        user: req.body.user,
        password: req.body.password
      }

      console.log({payload})
  
      // Try finding user with his/her email address
      let user = await User.findOne({
        where: { email : payload.user }
      })

      if (!user) {
        // Try finding user with his/her username 
        try {
          user = await User.findOne({
            where: { username: payload.user }
          })

          if (!user) {
            next({ status: 401, msg: "Invalid email or password"})
            
            // username is found -> check the password
          } else if (!comparePassword(payload.password, user.password)){
            next({ status: 401, msg: "Invalid email or password"})

          } else {
            // User is found using his/her username
            const access_token = signToken({
              id: user.id,
              email: user.email
            })
  
            res.status(200).json({
              access_token,
              avatar: user.avatarUrl
            })
          }
          
        } catch (err) {
          console.log(err)
          next(err)
        }

      } else if (!comparePassword(payload.password, user.password)) {

        // User is found, but the password given is wrong
        next({ status: 401, msg: "Invalid email or password" })

        } else {

          // User is found using his/her email address
          const access_token = signToken({
            id: user.id,
            email: user.email
          })

          res.status(200).json({ access_token })
        }
  
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async findOrgMembers(req, res, next) {

    try {

      const members = await User.findAll({
        where: {
          OrganizationId: +req.params.OrgId
        },
      })

      res.status(200).json({data: members})
      
    } catch (error) {
      console.log(error, '\n^----- error find org members')
      next(error)
      
    }
  }

  static async findById(req, res, next) {

    try {

      const user = await User.findByPk(+req.params.UserId)

      if (!user) {
        next({status: 404, msg: 'User not found'})
        
      } else {

        res.status(200).json({ data: user})
      }
      
    } catch (error) {
      console.log(error, '\n^----- error find user by id')
      next(error)
      
    }
  }
}

module.exports = UserController