const http = require('http');
const querystring = require('querystring');
const server = require('../serverFiles/server.json');

module.exports = (callback) => {

    if(server.registered === "no" && server.ip !== undefined){
        let mainIP = '81.170.157.146';
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
    }else {
        callback("Server already registered.");
    }

 
}
