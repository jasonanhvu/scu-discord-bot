const fetch = require(`node-fetch`);
const config = require(`../../config.json`);

module.exports  = {
    name: 'discord',
    description: 'Checks Discord\'s status!',
    category: 'Utility',
    async execute(message, args) {
        message.delete();

        let isAdmin = require(`../modules/isAdmin.js`);
        
        if(isAdmin(message, false)) {
            /* DISCORD STATUS CHECKER */
            const url = config.verification.status;
            const response = await fetch(url);
            const body = await response.json();

            if (!response.ok) {
                throw Error("Error: DISCORD_STATUS_REQUEST. Please tell the bot author.");
            }

            if (body.status.description == "All Systems Operational") {
                message.channel.send({ embed: { title: `:white_check_mark: ${body.status.description}`, description: "Check the status [here](https://discordstatus.com/)! :white_check_mark:", color: "GREEN", timestamp: new Date()}});
            } else {
                message.channel.send({ embed: { title: `:x: ${body.status.description}`, description: "There seems to be an error with some of the Discord servers. Double check [here](https://status.discordapp.com/)! :x:", color: "RED", timestamp: new Date()}});
            }
        }  
    }
}