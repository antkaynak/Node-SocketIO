
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app); //using http server instead of express server
const io = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('A new user is connected.');

    //socket.emit('newMessage', {
    //    from: 'example@com',
    //    text: 'Kappa123',
    //    createdAt: new Date().toString()
    //});

    socket.emit('newMessage',{
        from: 'Chat App',
        text: 'Welcome',
        createdAt: moment().valueOf()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Chat App',
        text: 'A new user joined!',
        creatdAt: moment().valueOf()
    })

    socket.on('disconnect', () => {
        console.log('An user was disconnected');
    });

    socket.on('createMessage', (message, callback)=>{
        //send to all clients
        //io.emit('newMessage', { 
        //    from: message.from,
        //    text: message.text,
        //    createdAt: new Date().toString()
        //});

        //send to all but this socket
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: moment().valueOf()
        });

        console.log('Create email', message);
        
        callback();
    });
});



server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});