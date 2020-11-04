const {User} = require('../models/index');
const {comparePassword} = require('../helpers/bcrypt');
const { token } = require('../helpers/jwt');

class AuthControler {
 static async register(req, res) {
    const newUser = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    }

    try {
        const addUser = await User.create(newUser);
        res.status(201).json({
            id: addUser.id,
            firstName : addUser.firstName,
            lastName : addUser.lastName,
            email: addUser.email
        })
    } catch (error) {
        res.status(500).json(error);
    }
 }

 static async login(req, res) {
    const userLogin = {
        email: req.body.email,
        password: req.body.password
    }

    try {
        const find = await User.findOne({
            where: {
                email: userLogin.email
            }
        })

        const compare = comparePassword(userLogin.password, find.password);

        if (!find || !compare) {
            res.status(401).json({
                msg: 'Gagal login'
            })
        } else {
            const access_token = {
                access_token :token({
                id: find.id,
                email: find.email
                })
            }
            res.status(200).json(access_token);
        }

    } catch (error) {
        res.status(500).json(error)
    }

 }
}

module.exports = AuthControler;