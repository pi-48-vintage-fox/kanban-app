const Encrypt = require('../helpers/bcrypt');
const Decoder = require('../helpers/jwt');
const { User, Organization, UserOrganization } = require('../models/index')

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await User.create({email, password});
      res.status(201).json(newUser);
    } catch(err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email
        }, include: Organization
      });
      if(!user) {
        throw {name: 'WrongEmailPassword'}
      } else {
        if(!Encrypt.compare(password, user.password)) {
          throw {name: 'WrongEmailPassword'}
        } else {
          const organizations = user.Organizations.map(element => {
            return {id: element.id, name: element.name}
          })
          const token = Decoder.sign({
            id: user.id,
            email: user.email,
            organizations
          });
          res.status(200).json({token})
        }
      }
    } catch(err) {
      next(err)
    }
  }

  static async userJoinOrg(req, res, next) {
    try {
      const user_id = req.loggedIn.id;
      const {organization_id} = req.body;
      const newRelation = await UserOrganization.create({ user_id, organization_id });
      res.status(201).json(`User with id ${newRelation.user_id} has joined the organization with id ${newRelation.organization_id}`);
    } catch(err) {
      next(err);
    }
  }
}

module.exports = Controller