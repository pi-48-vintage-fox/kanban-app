let bcrypt = require('bcryptjs');

function hashPassword(data) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(data, salt);

    return hash
}

function comparePassword(data, hash) {
    let compare = bcrypt.compareSync(data, hash);
    return compare
}

module.exports = {
    hashPassword,
    comparePassword
}