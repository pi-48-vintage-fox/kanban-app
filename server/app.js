if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const cors = require('cors')
const router = require('./routes')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

// const server = require('http').Server(app)

const server = app.listen(port, () => {
  console.log('App running on port ' + port)
})

var io = require('socket.io')(server, {
  cors: true,
  origins: ['http://localhost:1234', 'https://kanban-app-riva.web.app/'],
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('organizations', (data) => {
    io.emit('organizations', data)
  })

  socket.on('tasks', (data) => {
    socket.broadcast.emit('tasks', data)
  })
  socket.on('categories', (data) => {
    socket.broadcast.emit('categories', data)
  })
})
