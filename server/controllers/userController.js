const {User} = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')

module.exports= class userController{

    static async register(req,res,next){

        try {
            let params ={
                name: req.body.name,
                email:req.body.email,
                password: req.body.password,
                profilePicture:req.body.profilePicture
            }

            let registrasi = await User.create(params)
            res.status(201).json({msg:'User succesfully created'})
        } catch (error) {
            next (error)
        }
    }

    static async login(req,res,next){
        try {
            let params ={
                email: req.body.email,
                password: req.body.password
            }
            console.log(params)
            let loginUser = await User.findOne({where:{email:params.email}})
            
            if(loginUser && bcrypt.compareSync(params.password,loginUser.password)){
                var access_token = jwt.sign({id:loginUser.id, email:loginUser.email}, process.env.SECRET)
                res.status(200).json({access_token, name:loginUser.name, pic:loginUser.profilePicture})
            }else{
                next({name:'Password / Email are wrong'})
            }
        
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async google(req,res,next){
        //verify token
        let {google_access_token} = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID)
        async function verify(){
            const ticket = await client.verifyIdToken({
                idToken:google_access_token,
                audience:process.env.CLIENT_ID
            })
            const payload = ticket.getPayload()
            let fullName = `${payload.given_name} ${payload.family_name}`
            let cariUser = await User.findOne({where:{email:payload.email}})
           
            if(cariUser){
                //generate token
                let access_token =  jwt.sign({id:cariUser.id,email:cariUser.email},process.env.SECRET)
                res.status(200).json({access_token, name:cariUser.name ,picture:payload.picture,id:cariUser.id})
            }else{
                //asumsi login pakai id google tidak bisa pakai password emailnya
                let dataBaru = {
                    email:payload.email,
                    name: payload.name,
                    password:'udahada'
                }
                let buatUser = await User.create(dataBaru)
                let access_token =  jwt.sign({id:buatUser.id,email:buatUser.email},process.env.SECRET)
                res.status(200).json({access_token, name:buatUser.name, picture:payload.picture, id:cariUser.id})
            }
        }
        verify().catch(console.error)
    }
}