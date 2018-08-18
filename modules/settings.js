// The module for handling messages with "/" character in the beginning.
const isAdmin = require('./isAdmin');
module.exports = (message, onlineAmount, online, id, res) => {
    // Get the message
    if(message === "/help"){
        let help = "This function is not supported yet....";
        res(help);
    }
    if (message === "/online" && onlineAmount !== undefined){
        let send = "There is " + onlineAmount + " people here.";
        res(send);
    }
    else if(isAdmin(id)){
        // Kick players from the current session (Using socket ids.)
        if(message.substr(0, 5) === "/ban "){
            let target = message.substr(5);
            res("Admin command not supported yet.. (PLAYER: "+target+".");
        }
        // Get the ids of everyone who is online!
        if(message.substr(0, 7) === "/getids"){
            let onlineIDS = [];
            for(let i = 0; i < online.length; i++){
                onlineIDS.push(online[i].uid);
            }
            console.log(onlineIDS);
            res(onlineIDS);
        }
        // Get the id of a speciefic player that you then can use to ban or kick the member.
        if(message.substr(0,7) === "/getid "){
            let user = message.substr(7);
            console.log(user);
            let idForUser = "";
            for(let i = 0; i < online.length; i++){
                if(online[i].user === user){
                    idForUser = online[i].uid;
                }
            }
            res(idForUser);
        }
    }
}