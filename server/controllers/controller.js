const { Task, User } = require("../models/index")
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { default: Axios } = require('axios')
const {OAuth2Client} = require('google-auth-library')

class Controller {

    // Login-Register ===================================================
    static async register(req, res, next) {
        try {
            const payload = {
               name: req.body.name, 
               email: req.body.email,
               password: req.body.password
            }
           
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if(!user) {
                const user = await User.create(payload)
                res.status(201).json({
                    id: user.id,
                    name: user.name,
                    email: user.email
                })
            } else {
                res.status(401).json({
                    message: "Email Already in Use"
                })
            }

           
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if (!user) {
                res.status(401).json({
                    message: "Wrong email or password"
                })
            } else if (!comparePassword(payload.password, user.password)) {
                res.status(401).json({
                    message: "Wrong email or password"
                })
            } else {
                const id = user.id
                const access_token = signToken({
                    id: user.id,
                    name: user.name,
                    email: user.email
                })

                res.status(200).json({
                    access_token,
                    id
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async googleLogin(req, res, next) {
        const { google_access_token } = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID);

        let email = ''
        client.verifyIdToken({
          idToken: google_access_token,
          audience: process.env.CLIENT_ID,
        })
        .then(ticket=>{
          const payload = ticket.getPayload();
          email = payload.email 
          return User.findOne({where:{email}})
        })
        .then(user=>{
          if(user){
            return user
          }else{
            let newUser = {
                email,
                password:'12345678'
            }
            return User.create(newUser)
          }
        })
        .then(data=>{
            let userId = data.id
            let access_token = signToken({id: data.id, email:data.email})
            res.status(200).json({access_token, userId})
        })
        .catch(err=>{
            next(err)
        })
    }

    //Task=================================================
    static async showTask(req, res, next) {
        try {
            const data = await Task.findAll({
                include: User
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async addTask(req, res, next) {
        try {
            const data = {
                title: req.body.title,
                description: req.body.description,
                category: "Backlog",
                UserId: req.UserId,
            }
            const newTask = await Task.create(data)
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async editTask(req, res, next) {
        try {
            const data = {
                title: req.body.title,
                description: req.body.description
            }
            const editTask = await Task.update(data, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({ msg: 'Task has been updated' })
        } catch (err) {
            next(err)
        }
    }

    static async deleteTask(req, res, next) {
        try {
            const deletedTask = await Task.destroy({
                where: {
                    id: req.params.id
                }
            }) 
            res.status(200).json({ msg: 'Task has been updated' })
        } catch (err) {
            next(err)
        }
    }

    static async moveTask(req, res, next) {
        try {
            const data = {
                category: req.body.category
            }
            const movedData = await Task.update(data, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({ msg: 'Task has been updated' })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller