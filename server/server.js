
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app); //using http server instead of express server
const io = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('A new user is connected.');

    socket.on('disconnect', () => {
        console.log('An user was disconnected');
    });
});



server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});