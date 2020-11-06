const jwt = require('jsonwebtoken');

class Decoder {
  static sign(payload) {
    return jwt.sign(payload, process.env.SECRET);
  }

  static verify(token) {
    return jwt.verify(token, process.env.SECRET);
  }
}

module.exports = Decoder;