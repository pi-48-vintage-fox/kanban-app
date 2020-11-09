// const SibApiV3Sdk = require('sib-api-v3-sdk')
const { Task, User, Category } = require('../models')
// const { tomorrow, toDateString, convertToWesternFormat } = require('../helpers/date')

class TaskController {
  static async tasks(req, res, next) {
    try {
      console.log('fetching tasks ----------------------------------')
      // console.log('requser', req.user)
      const { OrganizationId } = req.user

      console.log({ OrganizationId })
      let tasks = await Task.findAll({
        where: { OrganizationId },
        include: User,
      })
      // console.log(tasks, '^---- tasks')

      let output = []

      tasks.forEach((task) => {
        output.push({
          id: task.id,
          title: task.title,
          description: task.description,
          CategoryId: task.CategoryId,
          OrganizationId: task.OrganizationId,
          User: {
            name: task.User.name,
            avatarUrl: task.User.avatarUrl,
            id: task.User.id,
          },
        })
      })

      // console.log(output)

      res.status(200).json(output)
    } catch (error) {
      next(error)
    }
  }

  static async tasksByUser(req, res, next) {
    const { user } = req
    console.log({ user }, '<< task controller')

    try {
      const tasks = await Task.findAll({
        where: {
          UserId: user.id,
        },
        order: [['createdAt', 'ASC']],
      })

      // console.log(JSON.stringify(tasks,null,2))

      res.status(200).json(tasks)
    } catch (error) {
      next(error)
    }
  }

  static async getTaskById(req, res, next) {
    try {
      const task = await Task.findByPk(req.params.TaskId)

      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }

  static async addTask(req, res, next) {
    // console.log(req.user, '\n^---- req user')
    console.log(req.body, '\n^---- req body')

    const { title, description, CategoryId } = req.body
    const { id, OrganizationId } = req.user

    const input = {
      title,
      description,
      CategoryId,
      OrganizationId,
      UserId: id,
    }

    try {
      const task = await Task.create(input)

      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }

  static async putTask(req, res, next) {
    console.log(
      req.body,
      '\n^----put task controller\n============================'
    )

    try {
      let { TaskId } = req.params

      if (!(await Task.findByPk(TaskId))) {
        throw { status: 404, msg: 'Task was not found' }
      }

      const { title, description, CategoryId } = req.body

      const input = { title, description, CategoryId }

      try {
        await Task.update(input, {
          where: { id: TaskId },
        })

        res.status(200).json({ msg: 'Task was modified successfully' })
      } catch (error) {
        next(error)
      }
    } catch (error) {
      next(error)
    }
  }

  static async patchTask(req, res, next) {
    console.log(req.body, '<<< patch task controller')

    try {
      let { TaskId } = req.params

      let newCategoryId = req.body.CategoryId

      console.log({ TaskId, newCategoryId })

      if (newCategoryId) {
        await Task.update(
          { CategoryId: newCategoryId },
          {
            where: { id: TaskId },
          }
        )

        res.status(200).json({ msg: `Task was moved successfully` })
      } else {
        throw { status: 404, msg: 'Task was not found' }
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteTask(req, res, next) {
    console.log('delete task')

    try {
      await Task.destroy({
        where: { id: req.params.TaskId },
      })

      res.status(200).json({ msg: 'Task was deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TaskController
