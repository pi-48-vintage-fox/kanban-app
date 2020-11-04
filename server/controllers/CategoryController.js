'use strict'
const { Category } = require('../models/index')

class CategoryController {
  static async addCategory(req, res, next){
    try {
      let params = { 
        name : req.body.name
      };
      let data = await Category.create(params)
      res.status(201).json(data)
    } catch (error) {
      res.status(400).json(error)
    }
  }
}

module.exports = CategoryController