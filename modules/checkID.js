const config = require('../config.json');
const uuid = require('uuid');
const fs = require('fs');

// Exports the module to the main script.
module.exports = (callback) => { //Callback function
    if(config.id === ""){ //Checks if the id is not set inside the config file (config.json)
        let id = uuid.v4(); //Generates a new id for the user.

        let newConfig = { //Sets new config so we can write it to the config file.
            username: config.username,
            id: id,
            mainserver: config.mainserver
        }
        let data = JSON.stringify(newConfig);
        fs.writeFileSync('./config.json', data); //Writes the new settings to config.json
        callback(newConfig); //Sends back the newconfig.
    }else {
        callback(config); //Sends the normal config.
    }
}