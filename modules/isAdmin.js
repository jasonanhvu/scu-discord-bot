/*
 .----------------.  .----------------.  .----------------.  .----------------.  .-----------------.                    
| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |                    
| |      __      | || |  ________    | || | ____    ____ | || |     _____    | || | ____  _____  | |                    
| |     /  \     | || | |_   ___ `.  | || ||_   \  /   _|| || |    |_   _|   | || ||_   \|_   _| | |                    
| |    / /\ \    | || |   | |   `. \ | || |  |   \/   |  | || |      | |     | || |  |   \ | |   | |                    
| |   / ____ \   | || |   | |    | | | || |  | |\  /| |  | || |      | |     | || |  | |\ \| |   | |                    
| | _/ /    \ \_ | || |  _| |___.' / | || | _| |_\/_| |_ | || |     _| |_    | || | _| |_\   |_  | |                    
| ||____|  |____|| || | |________.'  | || ||_____||_____|| || |    |_____|   | || ||_____|\____| | |                    
| |              | || |              | || |              | || |              | || |              | |                    
| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |                    
 '----------------'  '----------------'  '----------------'  '----------------'  '----------------'                     
 */

module.exports = function isAdmin(message, msg) {
    const config = require("../config.json");
    
    let error = require("../events/error.js");
    
    if (message.author.id == config.serverRoles.admin) {
      return true;
    } else {
      let role = config.serverRoles.admin;
      if (msg == true) {
        error(`You are missing the <@&${role}> permission role.`, message);
      }
    }
};