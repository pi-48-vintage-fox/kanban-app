module.exports = errorHandler = (err, req,res,next)=>{
    let status =err.status || 500
    let msg =[] || 'Internal Server Error'
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
  
    if (err.name == 'Error, Data Not Found'){
        status = 404
        msg = err.name
    }
    if (err.name == 'Please Fill Category Input'){
        status = 400
        msg = err.name
    }
    if (err.name == 'Please Fill Title Input'){
        status = 400
        msg = err.name
    }
  
 
    
    res.status(status).json({msg})
}