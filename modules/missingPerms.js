/*
========================================================================================
 __  __ _____  _____ _____ _____ _   _  _____     _____  ______ _____  __  __  _____ 
|  \/  |_   _|/ ____/ ____|_   _| \ | |/ ____|   |  __ \|  ____|  __ \|  \/  |/ ____|
| \  / | | | | (___| (___   | | |  \| | |  __    | |__) | |__  | |__) | \  / | (___  
| |\/| | | |  \___ \\___ \  | | | . ` | | |_ |   |  ___/|  __| |  _  /| |\/| |\___ \ 
| |  | |_| |_ ____) |___) |_| |_| |\  | |__| |   | |    | |____| | \ \| |  | |____) |
|_|  |_|_____|_____/_____/|_____|_| \_|\_____|   |_|    |______|_|  \_\_|  |_|_____/ 
========================================================================================
*/

module.exports = async function errorEvent(type, message) {
	message.channel.send({ embed: { title: `:x: Missing Permissions!`, description: `:no_entry_sign: | ${type}`}});
	message.channel.stopTyping(true);
};