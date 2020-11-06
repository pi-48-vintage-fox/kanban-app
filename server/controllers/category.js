const { Category, Task } = require('../models/index')

class Controller {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        where: {
          OrganizationId: req.params.orgId
        }
      });
      res.status(200).json(categories);
    } catch(err) {
      next(err);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const category = await Category.create({
        name: req.body.name,
        OrganizationId: req.params.orgId
      });
      res.status(201).json(category);
    } catch(err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const category = await Category.findOne({
        where: {
          id: req.params.id
        }
      })
      const tasks = await Task.findAll({
        where: {
          category: category.name
        }
      })
      if(tasks.length > 0) {
        throw {name: 'TasksDetected'}
      } else {
        const destroyed = await Category.destroy({
          where: {
            id: category.id
          }
        })
        res.status(200).json('Delete category successful')
      }
    } catch(err) {
      next(err)
    }
  }
}

module.exports = Controller