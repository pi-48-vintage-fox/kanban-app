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
const client = new OAuth2Client(process.env.GOOGLEKEY)

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
        const token = req.body.token
        let user = null
        let randomPass = Math.round(Math.random() * 10000000)
        client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLEKEY
            })
            .then((ticket) => {
                const payload = ticket.getPayload()
                user = {
                    full_name: `${payload.given_name} ${payload.family_name}`,
                    email: payload.email,
                    password: randomPass
                }
                return User.findOne({
                    where: {
                        email: user.email
                    }
                })
            })
            .then((data) => {
                return !data ? User.create(user) : data
            })
            .then((data) => {
                const {
                    id,
                    email,
                    full_name
                } = data
                const access_token = generateToken({
                    id,
                    email,
                    full_name
                })
                res.status(201).json({
                    id,
                    access_token,
                    full_name
                })
            })
            .catch((err) => {
                console.log(err)
            })

    }

    static getTask(req, res, next) {
        Task.findAll()
            .then((result) => {
                res.status(200).json(result)

            })
            .catch((err) => {
                next(err)
            })
    }

    static getCategory(req, res, next) {
        Category.findAll()
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                next(err)
            })
    }


    static postTask(req, res, next) {
        console.log(req.body)
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            UserId: req.userData.id,
            CategoryId: req.body.CategoryId || 1
        }
        console.log(newTask)
        Task.create(newTask)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static putTask(req, res, next) {
        console.log(" ini di put task")
        console.log({
            title: req.body.title,
            description: req.body.description,
            UserId: req.userData.id,
            CategoryId: req.body.CategoryId,
        })
        const taskData = {
            title: req.body.title,
            description: req.body.description,
            UserId: req.userData.id,
            CategoryId: req.body.CategoryId,
        }
        Task.update(taskData, {
                where: {
                    id: req.params.id
                }
            })
            .then((result) => {
                if (result) {
                    res.status(200).json({
                        status: "Success"
                    })
                } else {
                    next({
                        name: "BadRequestPatch"
                    })
                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static patchTaskCategory(req, res, next) {
        Task.update({
                CategoryId: req.body.CategoryId
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then((result) => {
                if (result) {
                    res.status(200).json({
                        status: "Success"
                    })
                } else {
                    next({
                        name: "BadRequestPatch"
                    })
                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static deleteTask(req, res, next) {
        Task.destroy({
                where: {
                    id: +req.params.id
                }
            })
            .then(result => {
                if (result) {
                    res.status(200).json({
                        "message": "Deleted Successfully"
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller