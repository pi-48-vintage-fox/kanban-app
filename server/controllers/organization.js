const { Organization } = require('../models/index');

class Controller {
  static async createOrganization(req, res, next) {
    try {
      const { name } = req.body;
      const newOrganization = await Organization.create({ name });
      res.status(201).json(newOrganization);
    } catch (err) {
      next(err)
    }
  }

  static async getAllOrganization(req, res, next) {
    try {
      const organizations = await Organization.findAll();
      res.status(200).json(organizations)
    } catch(err) {
      next(err)
    }
  }
}

module.exports = Controller;