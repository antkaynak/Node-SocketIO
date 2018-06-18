        //no need to specify the url to host
        //socketio will try to conncet to the server it is hosted from
        const socket = io(); 

        socket.on('connect', function() {
            console.log('Connected to server.');
        });

        socket.on('disconnect',function() {
            console.log('Disconnected from server.');
        });