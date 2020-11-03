const jwt = require('jsonwebtoken')
const key = 'inirahasiadapur'

module.exports = {
  
  generateToken : ( payload ) => {

    const key = 'inirahasiadapur'
    const token = jwt.sign( payload, key)
    
    return token
  },

  verifyToken : (token) => {

    const decoded = jwt.verify(token, key)
    return decoded
  }
}