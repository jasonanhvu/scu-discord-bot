const { Command } = require("discord.js-commando");
const { log } = require("../../functions/log.js");

module.exports = class kickCommand extends Command {
    constructor(client) {
        super(client, {
            name: "kick",
            group: "admins",
            memberName: "kick",
            description: "Kick members!", 
	    guildOnly: true,
            throttling: {
                usages: 2,
                duration: 5,
            },
            args: [
                {
                    key: "person",
                    prompt: "Please mention a user!",
                    type: "member",
                },
                {
                    key: "reason",
                    prompt: "Please enter a reason for why the user was kicked!",
                    type: "string"
                }
            ],
        });
    }

     async run ( message, { person, reason}) {
 
            
           if ((person.id === this.client.config.serverRoles.owner) || (this.client.config.serverRoles.modRoles.forEach(modRole => message.member.roles.cache.has(modRole)))) 
	            return message.channel.send({
                    embed: {
                        description: "I can't kick my owner or mods!",
                        color: this.client.config.school_color
                    }
	        });
 
            if(person.id === message.author.id) {
                return message.channel.send({embed: {
                    description: "You can't kick yourself!",
                    color: this.client.config.school_color
                }});
            }

 
        if(!reason) {
            this.client.error("You must provide a reason to kick the user!", message);
        } 

        await person.kick(reason);

        log(this.client, this.client.config.channels.auditlogs, { embed: { title: `User Kicked!`, description: `- Moderator: <@${message.author.id}>\n- User: <@${person.id}>\n- Reason: \`\`\`${reason}\`\`\``, color: "RED"}});
    }
}; 
