const http = require('http');
const querystring = require('querystring');
let user = require('../config.json');

user = JSON.stringify(user);
let mainIP = user.mainserver
let postData = querystring.stringify({
    verified: "true",
    user: user
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
module.exports = (callback) => {
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
}
