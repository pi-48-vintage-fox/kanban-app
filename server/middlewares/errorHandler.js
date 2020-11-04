'use strict'

function errorHandler(err,req,res,next){
  if(err) res.send(err)
  res.status(500).json(err)
}

module.exports = errorHandler
