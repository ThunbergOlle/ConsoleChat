// Live chat with other people using socket.io 
const io = require('socket.io-client');
const readline = require('readline');
const colors = require('colors');
const term =  require('terminal-kit').terminal;
const checkID = require('./modules/checkID');
const time = require('node-get-time');

const versionControl = require('./modules/versionControl');
const serverList = require('./modules/serverList.js');
const settings = require('./settings.json');
let user;

// Settings for readline node.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
console.log("Required all the modules... Starting up.");
// Checking id of the user inside another script.
checkID((res) => {
    user = res; //Sets the user to the response given when checking the id.
});
ServerList = () => {
    serverList((data) => {
        // Data is our variable for the server list given as a json array.
        term.green('Choose a server to connect to...');
        if(data !== '[]' || data !== undefined){ //If there are servers online, if the array given by the main server is not empty.
            list = JSON.parse(data);
            term.singleColumnMenu(list, (err, res) => {
                term('\n').eraseLineAfter.green("Connecting to: ", res.selectedText);
                chat(res.selectedText);
            });
        }else {
            console.log("\nThere are not any servers online at the moment.. :(".red);
        }
        
    });
}
setTimeout(ServerList, 2000);

let onlineUser = user.username; // Easy to access name of the current user.

chat = (adress) => {
    const socket = io('http://'+adress+':4000'); //Connects to the right socket or ip adress...
    socket.on('connected',(data) => { // When we are connected.
        console.log("\nThere are " + data.onlineAmount+ " other users inside this global chatroom!");
        socket.emit('newUser', { //Register a new user to the server.
            user: user.username,
            id: user.id
        });
        // Set up prompt and more....
        rl.setPrompt("> ");
        rl.prompt();
        rl.on('line', (message) => {
            // Send the message, (sent it when the ENTER key is activated on the clients keyboard..)
            if(message === '/leave'){
                socket.disconnect();
                console.log("Disconnected from server...".red);
                ServerList();
            }else {
            socket.emit('newMSG', {
                user: onlineUser,
                id: user.id,
                message: message,
            });
            rl.prompt();
            }
        });
        // When we recieve a message
        socket.on('recieveMSG', (data) => {
            let user = data.user;
            let id = data.id;
            let message = data.message;
            let admin = data.isAdmin;
            if(user === undefined){
                user = "[".white+"SERVER".red+"]".white;
                if(message === "You have been kicked!"){
                    ServerList();
                }
            }
            let timestamp = '';
            if(settings.timestamp === true) timestamp = '['+time.now().gray+'] ';
            if(admin && settings.adminprefix === true){
                console.log(timestamp+"[".white+"ADMIN".yellow+"] ".white+ user+ ": " + message);
            }
            else {

                console.log(timestamp+user+ ": " + message);
            }
            // Prompt the prefix for the line (>)
            rl.prompt();
        });
    });

}
