const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const fileUpload = require('express-fileupload');
const swaggerUI = require('swagger-ui-express');
const mongoose = require('mongoose');
require('dotenv').config();

const configs = require('./config/config');
const { userRouter, authRouter, carRouter } = require("./router");
const { cronRunner } = require("./cron");
const swaggerJSON = require('./swagger.json');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('static'));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.use(fileUpload());

const io = socketIO(server, { cors: 'http://localhost:80'});

io.on('connection', (socket) => {
    console.log(socket.id);

    // console.log(socket.handshake.auth);
    // console.log(socket.handshake.query);

    socket.on('message:send', (messageData) => {
        console.log(messageData.text);

        //send one to one
        socket.emit('message:new', messageData.text);
        //or maybe something like
        // socket.to(socket.id).emit('message:new', messageData.text);

        //send event to all except emitter
        // socket.broadcast.emit('message:new', messageData.text);

        //send event to all clients
        // io.emit('message:new', messageData.text);
    });

    socket.on('room:join', (roomInfo) => {
       socket.join(roomInfo.roomId);
       // socket.leave(roomInfo.roomId)

        // send to all in room except new member
       socket.to(roomInfo.roomId).emit('user:room:join', socket.id);

        //send to all in room
       // io.to(roomInfo.roomId).emit('user:room:join', socket.id);
    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} has disconnected`);
    });
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);

app.get('/', (req, res) => {
   res.json('Welcome');
});

app.use((err, req, res, next ) => {
    res.status(err.status || 500).json(err.message);
});

server.listen(configs.PORT, async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(configs.MONGO_URL);
    console.log(`Server listen ${configs.PORT}`);
    cronRunner();
});
