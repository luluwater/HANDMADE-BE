const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const SOCKET_PORT = process.env.SOCKET_PORT || 8080

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
})

server.listen(SOCKET_PORT, console.log(`webSocket has successfully Start at: ${SOCKET_PORT}`))

module.exports = { io }
