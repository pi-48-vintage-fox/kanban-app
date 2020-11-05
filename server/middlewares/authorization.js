'use strict'
const {Task} = require('../models/index')


const authorization = (req, res, next)=> {
    const id = req.params.id
    console.log(id)
    const userData = req.userData.id
    Task.findByPk(id)
    .then(data=> {
        if(!data) {
            res.status(404).json({msg: 'data not found'})
        } else if (userData !== data.UserId) {
            res.status(403).json({msg:'you cant access'})
        }
        else{
            next()
        }
    })
    .catch (err=> {
        res.status(500).json(err)
    }) 
}
module.exports = authorization