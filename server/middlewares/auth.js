const { verifyToken } = require('../helper/jwt')
const { User, Task } = require('../models')

module.exports = {

  authentication : async (req, res, next) => {

   console.log('di authentic');
    const { access_token } = req.headers

    try {

      if(access_token){

        const decoded = verifyToken(access_token)

        const user = await User.findOne({
          where : {
            email : decoded.email
          }
        })

        if(user) {

          req.loggedInUser = decoded
          console.log(req.loggedInUser);
          
          return next()

        } else {
   
          throw { name: 'Authentication Failed', msg: `You haven't login yet`, status: 401}
        }
      } 
      else{
        
        throw { name: 'Authentication Failed', msg: `You haven't login yet`, status: 401}
        
      } 
    } catch (error) {
     
      next(error)
    }
  },

  authorization: async (req, res, next) => {

      console.log('ini athor');
      
      const id = +req.params.id
      const userId = +req.loggedInUser.id
      
      try {
        
        //console.log(id, 'ini di author');
        const task = await Task.findByPk(id)
        if(!task){
          throw { name: 'Not Found', msg: `Data Not Found`, status: 404}
        }
        
        if(task.UserId === userId){

          return next()

        } else {

          throw { name: 'Authorization Failed', msg: `You don't have authorize to access this data`, status: 401}
        }
        
      } catch (error) {
        
        next(error)
        
      }

  }
}