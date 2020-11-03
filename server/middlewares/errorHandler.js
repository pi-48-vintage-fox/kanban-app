module.exports = errorHandler = (req,res,next)=>{
    let status 
    let msg =[]
    if (err.name == 'SequelizeValidationError'){
        status = 400
        for (let i =0; i < err.errors.length; i++){
             msg.push(err.errors[i].message)
        }
    }
    if (err.name == 'SequelizeUniqueConstraintError'){
        status = 400
        for (let i =0; i < err.errors.length; i++){
             msg.push(err.errors[i].message)
        }
    }
    if (err.name == 'Password / Email are wrong'){
        status = 400
        msg = err.name
    }
    if (err.name == 'Invalid Date Input'){
        status = 400
        msg = err.name
    }
    if (err.name == 'Error, Data Not Found'){
        status = 404
        msg = err.name
    }
    if (err.name == 'Cannot Fetch Stock Data From Server'){
        status = 400
        msg = err.name
    }
    if(err.name =='Internal Server Error'){
        status = 500
        msg = err.name
    }
 
    
    res.status(status).json({msg})
}