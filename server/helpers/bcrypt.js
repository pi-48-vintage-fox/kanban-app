'use strict'
const bcrypt = require('bcrypt')

function compareHash(payload, hashed){
  return bcrypt.compareSync(payload, hashed)
}

module.exports = {
  compareHash,
}