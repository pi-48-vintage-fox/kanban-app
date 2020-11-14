const {User, UserOrganizationTasks, Task} = require('../models/index');
const {generateHashPassword, verifyPassword} = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');

class Controller {
    static async getAllConj(req, res, next) {
        try {
            const conj = await UserOrganizationTasks.findAll({
                include: [User, Task]
            })
            res.status(200).json(conj)
        } catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: generateHashPassword(req.body.password)
        }
        try {
            const user = await User.create(data, {returning: true})
            res.status(201).json({id: user.id, name: user.name, email: user.email})
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        const dataUser = req.body
        try {
            const user = await User.findOne({
                where: {
                    email: dataUser.email
                }
            })
            if(!user) {
                next({name:"Unauthorized", msg: "Email or Password wrong"})
                return
            }
            const checkPassword = verifyPassword(dataUser.password, user.password)
            if(!checkPassword) {
                next({name:"Unauthorized", msg: "Email or Password wrong"})
                return
            }
            const access_token = generateToken({
                id: user.id, name: user.name, email: user.email
            })
            res.status(200).json({access_token, name: user.name})
            
        } catch (err) {
            next(err)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const token = req.body.access_token_google
            // console.log(token, "ni token di controller google") udh ada
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            // console.log(payload) udah muncul
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            // {where:{email: payload.email}}
            const user = await User.findOrCreate({
                where:{
                    email: payload.email
                },
                defaults: {
                    name: payload.name,
                    email: payload.email,
                    password: generateHashPassword("random")
                }
            })
            // console.log(user[0].email, "ini dr controller")
            let data
            if(Array.isArray(user)) {
                data = {
                    id: user[0].id,
                    name: user[0].name || "Mr",
                    email: user[0].email
                }
            } else {
                data = {
                    id: user.id,
                    name: user.name || "Mr",
                    email: user.email
                }
            }

            const accessToken = generateToken(data)
            res.status(200).json({access_token: accessToken, name: data.name})   
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller