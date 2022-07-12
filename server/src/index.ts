import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { roomHandler } from './room'
import { Events } from './types'
import path from 'path'

const port = 3000;
const app = express()
app.use(cors)
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
})

io.on(Events.Connection, (socket) => {
    roomHandler(socket)

    socket.on('disconnect', () => {
        console.log("user is disconnected")
    })
})

app.get('/*', (req, res) => {
    console.log(req)
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

server.listen(port, () => {
    console.log("Listening to the server", port)
})
