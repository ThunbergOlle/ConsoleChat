// This is the server script.
const serverName = "EU North Server1";
const io = require('socket.io');
const socket = io.listen(4000).sockets;
const settings = require('./modules/settings');

let online = []
let onlineAmount = 0;

// Check if someone connected to the servewr with the correct ports.
socket.on('connection', (socket) => {
    socket.emit("connected");
    socket.on('newUser', (data) => {
        console.log("New user");
        let newUser = data.user;
        online.push(newUser);
        onlineAmount = online.length
        console.log(online);
        console.log(onlineAmount);
    });

    // If we get a new MSG from a client that's connected to the server.
    socket.on("newMSG", (data) => {
        
        let firstChar = data.message.charAt(0);
        if(firstChar === "/"){
            settings(message);
        }
        let message = data.message;
        let user = data.user;
        let finishedMessage = user + ": " + message;
        console.log(user + ": " + message);
        // Emit the message to ALL client EXEPT the one who sent it.
        socket.broadcast.emit('recieveMSG', finishedMessage);
    });
});
