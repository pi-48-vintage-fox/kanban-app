const {User}  = require('../models/index')
const {hashPassword, comparePassword} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class UserController {

    static register (req, res, next) {

        const payload = {
            email: req.body.email,
            password: hashPassword(req.body.password),
            name: req.body.name
        }

        User.create(payload)
        .then(user => {
            let data = {
                id: user.id,
                email: user.email,
                name: user.name
            }
            let access_token = signToken(data)
            res.status(201).json({access_token, name: data.name})
        })
        .catch(err => {
            next(err)
        })
    }

    static login (req, res, next) {

        const payload = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({
            where: {
                email: payload.email
            }
        })
        .then(user => {
            if(!user || !comparePassword(payload.password, user.password)){
                let err = {
                    name: 'WrongEmailPassword'
                }
                throw next(err)
            }
            else{
                let data = {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
                let access_token = signToken(data)
                res.status(200).json({access_token, name: data.name})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static async googleLogin (req, res, next) {

        let {google_access_token} = req.body 
        const client = new OAuth2Client(process.env.CLIENT_ID)
        
        async function verify(){
            const ticket = await client.verifyIdToken({
                idToken:google_access_token,
                audience: process.env.CLIENT_ID
            })
            const payload = ticket.getPayload()
            let findUser = await User.findOne({where:{email:payload.email}})
            if(findUser){
                let access_token =  signToken({id:findUser.id,email:findUser.email,name:findUser.name})
                res.status(200).json({access_token, name:findUser.name})
            }
            else{
                let newData = {
                    email:payload.email,
                    password: process.env.NEW_PASSWORD,
                    name: payload.name
                }
                let createUser = await User.create(newData)
                let access_token =  signToken({id:createUser.id,email:createUser.email, name:createUser.name})
                res.status(200).json({access_token, name: createUser.name})
            }
        }
        verify().catch(console.error)
    }

}

module.exports = UserController