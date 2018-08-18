// Live chat with other people using socket.io 
const io = require('socket.io-client');
const user = require('./config.json');
const readline = require('readline');
const colors = require('colors');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let onlineUser = user.username; // Easy to access name of the current user.
console.log("Required all the modules... Starting up."); 
const socket = io('http://127.0.0.1:4000'); //Connects to the right socket or ip adress...
socket.on('connected',() => { // When we are connected.
    console.log("Connection Established. Providing user details....");
    socket.emit('newUser', { //Register a new user to the server.
        user: user.username
    });
    // Set up prompt and more....
    rl.setPrompt("> ");
    rl.prompt();
    rl.on('line', (message) => {
        // Send the message, (sent it when the ENTER key is activated on the clients keyboard..)
        socket.emit('newMSG', {
            user: onlineUser,
            message: message
        });
        rl.prompt();
    });
    // When we recieve a message
    socket.on('recieveMSG', (data) => {
        console.log(data.green);
        rl.prompt();

    });
})