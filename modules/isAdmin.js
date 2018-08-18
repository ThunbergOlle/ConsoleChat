const admins = require('../admins.json');
let list = admins.id;
module.exports = (uid) => {
    for(let i = 0; i < list.length; i++){
        if(list[i] === uid){
            return true;
        }
    }

    return false;
}