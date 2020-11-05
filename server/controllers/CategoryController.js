'use strict'

const { Category } = require("../models")

class CategoryController {

  static async index(req, res, next) {
    try {
      let categories = await Category.findAll()

      res.status(200).json({
        msg: 'Success',
        categories
      })

    } catch (err) {
      next(err)
    }
  }

  static async insert(req, res, next) {
    try {
      let data = {
        name: req.body.name
      }

      let category = await Category.create(data)
      res.status(200).json({
        msg: "Add category success",
        category
      })
    } catch (err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    try {
      let id = req.params.id
      let data = {
        name: req.body.name
      }

      let category = await Category.findByPk(id)
      category.name = data.name
      category.save()

      res.status(200).json({
        msg: "Category edited successfully",
        category
      })
    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      let id = req.params.id

      let category = await Category.findByPk(id)
      res.status(200).json({
        msg: "Category deleted",
        category
      })
      category.destroy()
    } catch (err) {
      next(err)
    }
  }

}

module.exports = CategoryController