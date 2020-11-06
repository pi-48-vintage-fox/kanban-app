'use strict'

function errorHandler(err,req,res,next){
  console.log(err);
  if(err.status) {
    console.log(err);
    res.status(err.status).json(err)
  }else{
    res.status(500).json(err)
  }
}

module.exports = errorHandler
