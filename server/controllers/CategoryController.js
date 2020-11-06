'use strict'
const { Category } = require('../models/index')

class CategoryController {

  static async showCategory(req,res, next){
    try {
      const data = await Category.findAll()
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

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