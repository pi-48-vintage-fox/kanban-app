const {Category} = require('../models/index')

class CategoryController {
    static allCategories (req, res, next) {
        Category.findAll()
        .then(categories => {
            console.log(categories)
            res.status(200).json(categories)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CategoryController