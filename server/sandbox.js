const bcrypt = require('bcrypt');

function generateHashPassword(pw) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pw, salt);
    return hash
}

console.log(generateHashPassword("rivari"))
console.log(generateHashPassword("rivari22"))