
//no need to specify the url to host
//socketio will try to conncet to the server it is hosted from
const socket = io(); 
socket.on('connect', function() {
    console.log('Connected to server.');

    //socket.emit('createMessage',{
    //    to:'example@com',
    //    text:'OMEGALUL'
    //}, function(){
    //    console.log('got it');
    //});
});

socket.on('disconnect',function() {
    console.log('Disconnected from server.');
});

socket.on('newMessage', function(message){
    appendMessage(message);
});

function appendMessage(message){
    const li = $('<li></li>');
    const formattedTime = moment(message.createdAt).format('h:mm a');
    li.text(`${formattedTime} ${message.from} : ${message.text}`);

    $('#messages').append(li);
}


$('#c-form').on('submit', function(e){
    e.preventDefault();
    const message = {
        from: 'User',
        text: $('#c-form input[name=message]').val(),
        createdAt: moment().valueOf()
    }

    socket.emit('createMessage', message, function(){
       appendMessage(message);
    })
});

        