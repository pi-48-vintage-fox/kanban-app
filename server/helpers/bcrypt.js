const bcrypt = require('bcrypt');

function generateHashPassword(pw) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pw, salt);
    return hash
}

function verifyPassword(pwInput, pwDB) {
    return bcrypt.compareSync(pwInput, pwDB);
}

module.exports = {generateHashPassword, verifyPassword}