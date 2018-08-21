const config = require('../config.json');
const uuid = require('uuid');
const fs = require('fs');

module.exports = (callback) => {
    if(config.id === ""){
        let id = uuid.v4();

        let newConfig = {
            username: config.username,
            id: id
        }
        let data = JSON.stringify(newConfig);
        fs.writeFileSync('./config.json', data);
        callback(newConfig);
    }else {
        callback(config);
    }
}