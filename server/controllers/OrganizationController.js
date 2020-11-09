const { Organization } = require('../models')

class OrganizationController {
  static async findAll(req, res, next) {
    try {
      const organizations = await Organization.findAll()

      res.status(200).json(organizations)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = OrganizationController
