var express = require('express');
var socket = require('socket.io');

// App Setup
var app = express();
var server = app.listen(3000, () => {
    console.log("Sever is listening on port 3000 ...");
});

// Add Static files
// app.use(express.static('public'));

//socket Setup
var io = socket(server);

// socket listen to event call 'connection'
io.on('connection', (socket) => {
    console.log('Socket connection successfull');
    console.log('User Connected: ', socket.id);

    socket.emit('connection', socket.id);
    //disconnect user
    socket.on('disconnect', () => {
    console.log('User Disconnected: ',socket.id);
    });

    //Listen to chat message
    socket.on('chat', (data) => {
        // 'sockets' refers to all sockets that are connected
        io.sockets.emit('chat', data);
    });

    //broadcast message to all connected users
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});
