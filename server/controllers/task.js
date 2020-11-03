const { Task } = require('../models/index')

class Controller {
  static async getTasks(req, res, next) {
    try {
      const tasks = await Task.findAll({
        where: {
          OrganizationId: req.params.orgId
        }
      });
      res.status(200).json(tasks);
    } catch(err) {
      next(err);
    }
  }

  static async addTask(req, res, next) {
    try {
      const { title, category, OrganizationId } = req.body;
      const newTask = await Task.create({ title, category, UserId: req.loggedIn.id, OrganizationId});
      res.status(201).json(newTask);
    } catch(err) {
      next(err)
    }
  }

  static async editTask(req, res, next) {
    try {
      const { title, category } = req.body;
      const edited = await Task.update({ title, category }, {
        where: {
          id: req.params.id
        },
        returning: true
      });
      res.status(200).json(edited[1])
    } catch(err) {
      next(err)
    }
  }

  static async moveTask(req, res, next) {
    try {
      const { category } = req.body;
      const moved = await Task.update({ category }, {
        where: {
          id: req.params.id
        },
        returning: true
      });
      res.status(200).json(moved[1]);
    } catch(err) {
      next(err)
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const destroyed = await Task.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json('Delete task successful')
    } catch(err) {
      next(err)
    }
  }
}

module.exports = Controller;