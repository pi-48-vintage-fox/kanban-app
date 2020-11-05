'use strict'
const jwt = require('jsonwebtoken')

const signToken = (input)=> {
    let token = jwt.sign(input, 'rahasia')
    return token
}
const verifyToken = (token)=> {
    return token = jwt.verify(token, 'rahasia')
}

module.exports = {
    signToken,
    verifyToken
}