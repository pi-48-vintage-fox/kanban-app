const jwt = require('jsonwebtoken')

function signToken(payload) {
    const token = jwt.sign(payload,'rahasiailahi')
    return token
}

function verifyToken(token) {
    const decoded = jwt.verify(token, 'rahasiailahi')
    return decoded
}

module.exports = {
    signToken,
    verifyToken
}