const {Task,User} = require("../models/")

class TaskController {

    // router.get('/tasks',TaskController.list)
    static async list(req,res,next){
        try {
            const data = await Task.findAll({
                order: [['id', 'ASC']],
                include: {
                    model : User,
                    attributes : ['email']
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }

    }
    // router.post('/tasks',TaskController.add)
    static async add(req,res,next){
        try {
            const obj = {
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                UserId : req.userLogin.id
            }
            const data = await Task.create(obj)
            res.status(201).json(data)
            
        } catch (error) {
            next(error)
        }

    }
    // router.get('/tasks/:id',TaskController.show)
    static async show(req,res,next){
        try {
            const {id} = req.params
            const data = await Task.findByPk(id)
            if(!data){
                throw {name:"Data Not Found"}
            }else{
                res.status(200).json(data)
            }
            
        } catch (error) {
            next(error)
        }
    }
    // router.put('/tasks/:id',TaskController.edit)
    static async edit(req,res,next){
        try {
            const {id} = req.params
            const obj = {
                title: req.body.title,
                description: req.body.description,
                category:req.body.category
            }
            const data = await Task.update(obj,{where:{id},returning:true})
            if(!data[1][0]){
                throw {name:"Data Not Found"}
            }else{
                res.status(200).json(data[1][0])
            }
            
        } catch (error) {
            next(error)
        }
    }
    // router.patch('/tasks/:id',TaskController.updateCategory)
    static async updateCategory(req,res,next){
        try {
            const {id} = req.params
            const obj = {
                category: req.body.category
            }
            const data = await Task.update(obj,{where:{id},returning:true})
            if(!data[1][0]){
                throw {name:"Data Not Found"}
            }else{
                res.status(200).json(data[1][0])
            }
            
        } catch (error) {
            next(error)
        }
    }
    static async delete(req,res,next){
        try {
            const {id} = req.params
            const data = await Task.destroy({where:{id}})
            if(data === 1){
                res.status(200).json({msg: 'Task Deleted'})
            }else{
                throw {name:"Data Not Found"}
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports=TaskController