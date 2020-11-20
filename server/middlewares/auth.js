const { verifyToken } = require('../helpers/jwt')
const { User, Task } = require('../models/index')

async function authentication(req,res, next){
  try {
    const access_token = req.headers.access_token
    if(!access_token){
      throw { msg : 'unathorized', status : 401}
    }
    const decoded = verifyToken(access_token)
    const user = await User.findOne({
      where : {
        email : decoded.email
      }
    })
    if(!user){
      throw { msg : 'unathorized', status : 401}
    }
    else{
      req.UserId = decoded.id
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function authorization(req,res,next){
  const id = req.params.id
  try {
    const task = await Task.findByPk(id)
    if (task && task.UserId === req.UserId){
      next()
    }
    else{
      throw({msg:'not authorized', status : 401})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }  
}

module.exports = {
  authentication,
  authorization,
}