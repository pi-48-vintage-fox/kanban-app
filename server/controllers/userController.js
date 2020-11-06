const {User} = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')

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
        
    }
}