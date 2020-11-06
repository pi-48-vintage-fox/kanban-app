'use strict'
const jsonwebtoken = require('jsonwebtoken');

function signToken(payload){
  return jsonwebtoken.sign(payload,process.env.JWT_SECRET || "inirahasias3cr3t")
}

function decodeToken(payload){
  return jsonwebtoken.decode(payload,process.env.JWT_SECRET || "inirahasias3cr3t")
}

module.exports = {
  signToken,
  decodeToken
};
