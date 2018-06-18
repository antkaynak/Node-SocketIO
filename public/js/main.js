
//no need to specify the url to host
//socketio will try to conncet to the server it is hosted from
const socket = io(); 
socket.on('connect', function() {
    console.log('Connected to server.');

    socket.emit('createMessage',{
        to:'example@com',
        text:'OMEGALUL'
    }, function(){
        console.log('got it');
    });
});

socket.on('disconnect',function() {
    console.log('Disconnected from server.');
});

socket.on('newMessage', function(email){
    console.log('New Email', email);
});

        