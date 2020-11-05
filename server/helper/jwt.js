var jwt = require('jsonwebtoken');

function createJWT(data) {
    let token = jwt.sign(data, process.env.SECRET);
    return token
}

function decodeJWT(token) {
    let decoded = jwt.verify(token, process.env.SECRET);
    return decoded
}

module.exports = {
    createJWT,
    decodeJWT
}