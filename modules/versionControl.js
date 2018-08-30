const checkUpdate = require('check-update-github');
const pkg = require('../package.json');
const settings = require('../settings.json');

module.exports = checkUpdate({
    name: pkg.name, 
    currentVersion: pkg.version, 
    user: 'https://github.com/ThunbergOlle',
    branch: 'master'
    }, function(err, latestVersion, defaultMessage){
    if(!err && settings.showUpdates === true){
        console.log(defaultMessage);
    }
});