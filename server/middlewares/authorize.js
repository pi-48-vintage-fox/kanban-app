const { Task, Organization, User, UserOrganization } = require('../models/index');

class Authorize {
  static async task(req, res, next) {
    try {
      const task = await Task.findByPk(req.params.id);
      if(!task) {
        throw {name: 'NotFound'}
      } else {
        if(task.UserId !== req.loggedIn.id) {
          throw {name: 'UserUnauthorized'}
        } else {
          next();
        }
      }
    } catch(err) {
      next(err)
    }
  }

  static async organization(req, res, next) {
    try {
      const organization = await Organization.findOne({
        where: {
          id: req.params.orgId
        }, include: User
      });
      if(!organization) {
        throw {name: 'NotFound'}
      } else {
        let flag = false;
        organization.Users.forEach(element => {
          if(element.id === req.loggedIn.id) {
            flag = true;
          }
        })
        if(flag === false) {
          throw {name: 'UserUnauthorized'}
        } else {
          next()
        }
      }
    } catch(err) {
      next(err)
    }
  }
}

module.exports = Authorize;