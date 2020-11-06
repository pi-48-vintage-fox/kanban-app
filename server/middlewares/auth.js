const {User,Task} = require('../models/')
const jwt = require('jsonwebtoken')

const authentication= (req,res,next) =>{
    const access_token = req.headers.access_token
    if(access_token){
        const decode = jwt.verify(access_token,process.env.SECRET)
        req.userData = decode
        User.findByPk(req.userData.id)
        .then(user=>{
            if(!user){
                return res.status(404).json({msg:'You dont have valid authentication'})
            }
            next()
        })
        .catch(err=>{
            res.status(500).json({msg:err.message})
        })
    }else{
        res.status(401).json({msg:'You Need to register/login'})
    }
}

const authorization = (req,res,next)=>{
    const {id} = req.params
    const userData = req.userData.id
    Task.findByPk(id)
    .then(user=>{
        if(!user){
            res.status(404).json({msg:'Ensure your task detail is correct'})
        }else if (userData !== user.UserId){
            res.status(403).json({msg:'You dont have right to do that action'})
        }else{
            next()
        }
    })
    .catch(err=>{
        res.status(500).json({msg:err.message})
    })
}

module.exports={
    authentication,
    authorization
}