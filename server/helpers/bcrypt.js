const bcrypt = require('bcryptjs');

class Encrypt {
  static hash(password) {
    const salt = bcrypt.genSaltSync(6);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static compare(password, hashed) {
    return bcrypt.compareSync(password, hashed);
  }
}

module.exports = Encrypt;