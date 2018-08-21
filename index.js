// Live chat with other people using socket.io 
const io = require('socket.io-client');
const user = require('./config.json');
const readline = require('readline');
const colors = require('colors');
const serverList = require('./modules/serverList.js');
const term =  require('terminal-kit').terminal;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
serverList((data) => {
    // Data is our variable for the server list given as a json array.
    term.green('Choose a server to connect to...');
    let list = [];

    // GOING TO ADD A FOREACH LOOP HERE TO ADD EACH AS A SEPERATE INDEX.
    list.push(data);

    term.singleColumnMenu(list, (err, res) => {
        term('\n').eraseLineAfter.green("Selected", res.selectedText);
    });
});

let onlineUser = user.username; // Easy to access name of the current user.
console.log("Required all the modules... Starting up."); 
const socket = io('http://127.0.0.1:4000'); //Connects to the right socket or ip adress...
socket.on('connected',(data) => { // When we are connected.
    console.log("There are " + data.onlineAmount+ " other users inside this global chatroom!");
    socket.emit('newUser', { //Register a new user to the server.
        user: user.username,
        id: user.id
    });
    // Set up prompt and more....
    rl.setPrompt("> ");
    rl.prompt();
    rl.on('line', (message) => {
        // Send the message, (sent it when the ENTER key is activated on the clients keyboard..)
        socket.emit('newMSG', {
            user: onlineUser,
            id: user.id,
            message: message,
        });
        rl.prompt();
    });
    // When we recieve a message
    socket.on('recieveMSG', (data) => {
        let user = data.user;
        let id = data.id;
        let message = data.message;
        let admin = data.isAdmin;
        if(user === undefined){
            user = "[".white+"SERVER".red+"]".white;
        }
        if(admin){
            console.log("[".white+"ADMIN".yellow+"] ".white+ user+ ": " + message);
        }
        else {
            console.log(user+ ": " + message);
        }
        rl.prompt();
    });
})