const {Task} = require('../models/index');

async function authorization(req, res, next) {
    try {
        const find = await Task.findByPk(+req.params.id);
        if (find.UserId == req.userHasLogin.id) {
            next()
        } else if (!find) {
            next({
                name: 'not found'
            });
        } else {
            next({
                name: 'unauthorized'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = authorization;