'use strict'
require('dotenv').config()
const express = require('express');
const app = express()
const cors = require('cors');
const Routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const port = process.env.PORT || 3000
const server = require('http').Server(app)
const io = require("socket.io")(server)



const { Task, User, TaskTag, Category} = require("./models")


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', Routes)
app.use(errorHandler)

io.on('connect',(socket)=>{
  console.log("userConnected");
  socket.on('updateTask',async function (data){
    console.log(data);
      let tasks = await Category.findAll({
        order:[
          ["id","ASC"],
          [Task,"createdAt","ASC"]
        ],
        include:[
          {
            model: Task,
            as: "Tasks",
            include:[TaskTag,User],           
          }
        ]
      })
      io.emit("tasksUpdated",tasks)     
  })
})

server.listen(port)