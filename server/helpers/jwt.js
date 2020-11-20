'use strict'
const jsonwebtoken = require('jsonwebtoken')

function signToken(payload){
  const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET || 'rahasia')
  return token
}

function verifyToken(token){
  const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET || 'rahasia')
  return decoded
}

module.exports = {
  verifyToken,
  signToken
}