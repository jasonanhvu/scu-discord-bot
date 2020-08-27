const { MessageEmbed } = require(`discord.js`); //for embed functionality
const config = require('../config.json');

module.exports = {
	name: 'kick',
    description: 'Kick a member!',
    guildOnly: true,
    usage: `${config.prefix}kick [user mention] [reason]`,
	async execute(message, args) {   
        message.delete();

        if(message.member.hasPermission("KICK_MEMBERS")) {
            // the kick code here

            const kickInstructions = new MessageEmbed()
                .setColor(config.school_color)
                .addField("Here's an example:", "&kick <@401542675423035392> Being Admin")
                .setTimestamp()

            const member = message.mentions.members.first();
            if(!member) return message.channel.send(kickInstructions)
            .then(msg => msg.delete({timeout: 10000}))

            if(!member.kickable) return message.channel.send({embed: {
                description: "I can't kick this user!",
                color: config.school_color
                }
            }).then(msg => msg.delete({timeout: 2000})) 
            
            if(member.user.id === "401542675423035392" || member.user.id === "403377362730876928") 
                return message.channel.send({embed: {
                    description: "I can't kick my owner!",
                    color: config.school_color
                }
            }).then(msg => msg.delete({timeout: 2000})) 

            if(member.id === message.author.id) return message.channel.send({embed: {
                description: `You can't kick yourself!`,
                color: config.school_color
                }
            }).then(msg => msg.delete({timeout: 2000})) 

            const reason = args.slice(1).join(" ");

            if(!reason) {
                message.channel.send(`You must provide a reason to kick the user!`)
                .then(msg => msg.delete({timeout: 2000}))
            } else {
                reason_card = reason;
            }

            await member.kick(reason)
            .catch(err => console.log(`Error: ${err}`))

            let auditLogs = message.guild.channels.cache.find(channel => channel.name === "audit-logs");

            const kick_card = MessageEmbed()
                .setColor(config.school_color)
                .setTitle(`Kick | ${member.user.tag}`)
                .addField("User", member, true)
                .addField("Moderator", message.author, true)
                .addField("Reason", reason_card)
                .setTimestamp()

            auditLogs.send(kick_card);
        } else {
            return message.channel.send({embed: {
                description: `You must have the following permission(s): ` + "`KICK MEMBERS`",
                color: config.school_color,
                image: {
                    url: `attachment://no_perm.gif`,
                },
                files: [{
                    attachment: `./assets/no_perm.gif`,
                    name: `no_perm.gif`
                }],
                }
            }).then(msg => msg.delete({timeout: 2000}))
        }
    }
}