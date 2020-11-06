'use strict'
const jwt = require('jsonwebtoken')

const signToken = (input)=> {
    let token = jwt.sign(input, process.env.SECRET)
    return token
}
const verifyToken = (token)=> {
    return token = jwt.verify(token, process.env.SECRET)
}

module.exports = {
    signToken,
    verifyToken
}