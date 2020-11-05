const {User} = require("../models/")
const jwt = require("../helpers/jwt")
const bcrypt = require("bcryptjs")

class UserController {

    static async register(req,res, next){
        try {
            const obj = {
                email: req.body.email,
                password: req.body.password
            }
            const data = await User.create(obj,{returning:true})
            res.status(201).json({id:data.id,email:data.email})
        } catch (err) {
            next(err)
        }
    }

    static async login(req,res,next){
        try {
            const {email,password} = req.body
            const data = await User.findOne({where : {email}})
            if(data){
                const pass = await bcrypt.compare(password,data.password)
                if(pass){
                    let access_token = jwt.signToken({id:data.id,email:data.email})
                    console.log(req.headers);
                    res.status(200).json({access_token,id:data.id,email:data.email})
                }else{
                    throw {name:'Invalid email or password'}    
                }
            }else{
                throw {name:'Invalid email or password'}
            }
        } catch (err) {
            next(err)
        }
    }
}
module.exports=UserController