const http = require('http');
const querystring = require('querystring');
const server = require('../serverFiles/server.json');
const fs = require('fs');
const config = require('../config.json');

module.exports = (callback) => {

    if(server.registered === "no" && server.ip !== undefined){
        let mainIP = config.mainserver
        let postData = querystring.stringify({
            verified: "true",
            newserver: server.ip
        });
        let options = {
            hostname: mainIP,
            port: 3000,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };
        let req = http.request(options, function (res) {

            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                callback(chunk);
            });

            res.on('end', function () {
            });
        });

        req.on('error', function (e) {
            callback(e);
        });
        req.write(postData);
        req.end(); 
        
        let serverconfig = {
            ip: server.ip,
            registered: "yes"
        }
        let data = JSON.stringify(serverconfig);
        fs.writeFileSync('./serverFiles/server.json', data);
    }else {
        callback("Server is in the database.");
    }

 
}
