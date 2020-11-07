const {verify} = require('../helpers/jwt');
const {User} = require('../models/index');

async function authentication(req, res, next) {
    const token = req.headers.access_token;

    if (!token) {
        res.status(401).json({
            msg: "Authentication failed"
        })
    } else {
        const decoded = verify(token);
        const user = await User.findOne({
            where: {
                email: decoded.email
            }
        })
        if (!user) {
            res.status(401).json({
                msg: 'Authentication failed'
            })
        } else {
            req.userHasLogin = decoded;
            if (req.userHasLogin) {
                next();
            }
        }
    }
}

module.exports = authentication;