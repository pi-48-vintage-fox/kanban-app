const {Task, User} = require('../models/')

module.exports = class taskController {

    static async posting(req,res,next){
        try {
            let params ={
                title: req.body.title,
                category:req.body.category,
                UserId:req.userData.id
            }
            let postTask = await Task.create(params)
            res.status(201).json(postTask)
        } catch (error) {
            next(error)
        }
    }

    static async getPosting(req,res,next){
        try {
            let allPosting = await Task.findAll({order:[['updatedAt', 'DESC']]})
            res.status(200).json(allPosting)
        } catch (error) {
            next(error)
        }
    }


    static async category(req,res,next){
        try {
            let {id} = req.params
            let params = {
                category:req.body.category
            }
            let updateData = await Task.update(params, {where:{id}, returning:true})
            if (updateData[0] == 0){
                next({name:'Error, Data Not Found'})
            }else if(!params.category){
                next({name:'Please Fill Category Input'})
            }else{
                res.status(200).json(updateData[1][0])
            }
        } catch (error) {
    
            next(error)
        }
    }

    static async title(req,res,next){
        try {
            let {id} = req.params
            let params = {
                title:req.body.title
            }
            let updateData = await Task.update(params, {where:{id}, returning:true})
            if (updateData[0] == 0){
                next({name:'Error, Data Not Found'})
            }else if(!params.title){
                next({name:'Please Fill Title Input'})
            }else{
                res.status(200).json(updateData[1][0])
            }
        } catch (error) {
    
            next(error)
        }
    }

    static async delete(req,res,next){
        try {
            let {id}=req.params
            let deleteItem = await Task.destroy({where:{id}})
            if(!deleteItem){
                next({name:'Task Not Found'})
            }else{
                res.status(200).json(`Task sucessfully deleted `)
            }
        } catch (error) {
            next(error)
        }
    }

}