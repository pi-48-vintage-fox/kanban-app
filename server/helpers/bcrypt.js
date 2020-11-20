const bcyrpt = require('bcrypt')

function hashPassword(password){
    const salt = bcyrpt.genSaltSync(+process.env.SALT)
    const hash = bcyrpt.hashSync(password, salt)
    return hash
}

function comparePassword(password, hash) {
    return bcyrpt.compareSync(password, hash)
}


module.exports = {
    hashPassword,
    comparePassword
}