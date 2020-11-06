const {Category} = require("../models/")

class CategoryController {
    static async list(req,res,next){
        try {
            const data = await Category.findAll({
                order: [['id', 'ASC']]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }

    }
    static async add(req,res,next){
        try {
            const obj = {
                name: req.body.name,
                color: req.body.color,
                order: req.body.order,
            }
            const data = await Category.create(obj)
            res.status(201).json(data)
            
        } catch (error) {
            next(error)
        }

    }
}

module.exports = CategoryController