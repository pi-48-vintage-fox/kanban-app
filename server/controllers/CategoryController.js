const {Category} = require('../models/index');

class CategoryController {
    static async getCategories(req, res, next) {
        try {
            const category = await Category.findAll()
            res.status(200).json(category)
        } catch (err) {
            next(err)
        }
    }

    static async addCategory(req, res, next) {
        try {
            const dataCategory = req.body
            console.log(dataCategory)
            const category = await Category.create(dataCategory, {returning: true})
            res.status(201).json(category)
        } catch (err) {
            next(err)
        }
    }

    static async deleteCategory(req, res, next){
        try {
            const catId = +req.params.id
            const category = await Category.destroy({
                where: {
                    id: catId
                }
            }) 
            res.status(200).json({msg: `Successfully delete category with id: ${catId}`})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CategoryController