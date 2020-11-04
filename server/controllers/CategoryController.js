const {Category} = require('../models')

class CategoryController {

  static async categories(req, res, next) {

    try {

      const categories = await Category.findAll({
        where: {
          OrganizationId: req.user.OrganizationId
        }
      })

      res.status(200).json({data: categories})
    } catch (error) {
      next(error)
      
    }
  }

  static async addCategory(req, res, next) {
    try {

      let input = {
        name: req.body.name,
        OrganizationId: req.user.OrganizationId
      }

      const category = await Category.findOne({
        where: {
          name: input.name
        }
      })

      if (category) {
        throw ({status: 409, msg: "Category with the same name already exists, please choose another name"})
      } else {

        const category = await Category.create(input)
  
        res.status(201).json(category)
      }
      
    } catch (error) {
      next(error)
    }
  }

  static async patchCategory(req, res, next) {
    try {

      const {name} = req.body

      await Category.update({name}, {
        where: {
          id: req.params.CategoryId
        }
      })

      res.status(200).json({msg: 'Category was renamed successfully' })
      
    } catch (error) {
      next(error)
      
    }

  }

  static async deleteCategory(req, res, next) {
    console.log(req.params,'<<<< req params delete category controller')
    try {

      const result = await Category.destroy({
        where: {
          id: req.params.CategoryId
        }
      })

      if (result === 0) {
        throw ({status: 404, msg: 'Category was not found'})
      }

      res.status(200).json({msg: 'Category was deleted successfully'})
      
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CategoryController