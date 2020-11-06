const { comparePass } = require('../helpers/bcrypt')
const { loginToken } = require('../helpers/jwt')
const { User } = require('../models/index')

class UserController {
    static async register(req,res,next){
        try {
            const input ={
                email: req.body.email,
                password: req.body.password
            }
            console.log('masuk sini loh');
            const newUser = await User.create(input)
            res.status(201).json({
                id: newUser.id,
                email: newUser.email
            })
            
        } catch (err) {
            next(err)
        }
    }
    static async login(req,res,next){
        try {
            console.log('masuk gaya?');
            console.log(req.body);
            const input = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await User.findOne({
                where: {
                    email: input.email
                }
            })
            if(!user){
                res.status(401).json({ msg: 'Wrong email or password' })
            }else if (!comparePass(input.password, user.password)){
                res.status(401).json({ msg: 'Wrong email or password' })
            }
            else{
                const access_token = loginToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({ access_token })
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController