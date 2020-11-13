const bcrypt = require('bcryptjs')

function hashpassword(password) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}

module.exports = {
  hashpassword,
  comparePassword
}