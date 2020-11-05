'use strict'
const bcrypt = require('bcrypt')

const hashPassword = (password)=> {
    const hash = bcrypt.hashSync(password, 10);
    return hash
}

const compare = (password, hash)=> {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashPassword,
    compare
}