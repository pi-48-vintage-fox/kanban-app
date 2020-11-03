const {
    User,
    Task,
    Category
} = require('../models')
const {
    comparePassword
} = require('../helpers/bcrypt')
const {
    generateToken
} = require('../helpers/jwt')
const {
    OAuth2Client
} = require('google-auth-library')

class Controller {

    static postRegister(req, res, next) {
        const userData = {
            email: req.body.email,
            password: req.body.password,
            full_name: req.body.full_name || "",
        }
        User.create(userData)
            .then(({
                email,
                password,
                full_name
            }) => {
                res.status(201).json({
                    email,
                    password,
                    full_name
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    static postLogin(req, res, next) {
        const userData = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({
                where: {
                    email: userData.email
                }
            })
            .then((result) => {
                if (result && comparePassword(userData.password, result.password)) {
                    const {
                        id,
                        email,
                        full_name
                    } = result
                    const access_token = generateToken({
                        id,
                        email,
                        full_name
                    })
                    res.status(200).json({
                        id,
                        access_token,
                        full_name
                    })
                } else {

                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static postGoogleLogin(req, res, next) {

    }

    static postTask(req, res, next) {
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            UserId: req.userData.id,
            CategoryId: req.body.CategoryId || 1
        }
        Task.create(newTask)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static getTask(req, res, next) {
        Task.findByPk(req.params.id)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static postCategory(req, res, next) {

    }

    static putTask(req, res, next) {

    }

    static patchTaskCategory(req, res, next) {

    }

    static deleteTask(req, res, next) {
        Task.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if(result){
                res.status(200).json({
                    "message" : "Deleted Successfully"
                })
            } 
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller