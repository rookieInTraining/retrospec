const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');

const ui = require("./routes/ui");
const api = require("./routes/api");
const RetroSpec = require("./model/RetroPoint");

const app = express();

app.use("/ui", ui);
app.use("/api", api);

app.get('/', (req, res) => {
    res.redirect(302, '/ui')
})

const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect("mongodb://localhost:27017/retrospec");

io.on('connection', (socket) => {
    socket.data.username = faker.internet.userName();
    console.log(`New client connected! Id : ${socket.id}`);

    socket.join(socket.id);

    socket.on('message', (message) => {
        io.emit('message', message);
    })

    socket.on('typing', (e) => {
        const typingUsers = {username : socket.data.username};
        io.emit('typing', typingUsers)
    })

    socket.on('stop_typing', (e) => {
        const typingUsers = {username : socket.data.username};
        io.emit('stop_typing', typingUsers)
    })

    socket.on('disconnect', (e) => {
        console.log(`Client Disconnected!\nReason : ${e}`);
    })

    socket.on('move', async (data) => {
        if(data) {
            const point = await RetroSpec.findById(data.id);
            point.bucket = data.targetId;
            await point.save();
        }
        io.emit('move', data);
    });

    socket.on("delete", async (data) => {
        if(data) {
            const msg = await RetroSpec.findById(data);
            msg.deleted = true;
            await msg.save();
        }
    });

    socket.on("save", async (data) => {
        const msg = new RetroSpec({
            _id: data._id,
            message: data.message, 
            bucket: data.bucket,
            dashboardId: data.dashboardId,
            createdTime: data.createdTime
        });
        await msg.save();
    })
    
});

const port = 4201;
server.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));