
const getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

//no need to specify the url to host
//socketio will try to conncet to the server it is hosted from
const socket = io(); 
socket.on('connect', function() {
    console.log('Connected to server.');

    const name = getUrlParameter('name');
    const room = getUrlParameter('room');

    console.log(name);
    console.log(room);

    //join a room
    socket.emit('join', { name, room}, function(error){
        if(error){
           alert('An error occurred!', error);
           return window.location.href = '/';
        }
        console.log('Success!');
    });

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

socket.on('updateUserList', function(users){
    console.log(users);
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

        