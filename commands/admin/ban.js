const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const { prefix } = require('../config.json');

module.exports = {
	name: 'ban',
    description: 'Ban a member!',
    usage: `${prefix}ban [user mention] [reason]`,
    guildOnly: true,
	async execute(message, args) {   
        if(message.member.hasPermission("BAN_MEMBERS")) {
            // the ban code here

            const ban_Instructions = new Discord.MessageEmbed()
                .setColor(10231598)
                .addField("Here's an example:", "&ban <@401542675423035392> Being Admin")
                .setTimestamp()

            const member = message.mentions.members.first();
            if(!member) return message.channel.send(ban_Instructions)
            .then(msg => msg.delete({timeout: 10000}))
            .catch(err => console.log(`Error: ${err}`))

            if(!member.bannable) return message.channel.send({embed: {
                description: "I can't ban this user!",
                color: 10231598
                }
            }).then(msg => msg.delete(2000))
            .catch(err => console.log(`Error: ${err}`))

            if(member.user.id === "401542675423035392" || member.user.id === "403377362730876928") 
                return message.channel.send({embed: {
                    description: "I can't ban my owner!",
                    color: 10231598
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(err => console.log(`Error: ${err}`))

            if(member.id === message.author.id) return message.channel.send({embed: {
                description: `You can't ban yourself!`,
                color: 10231598
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(err => console.log(`Error: ${err}`))

            const reason = args.slice(1).join(" ");

            if(!reason) {
                message.channel.send(`You must provide a reason to ban the user!`)
                .then(msg => msg.delete({timeout: 2000}))
            } else {
               await member.ban(reason)
               .catch(err => console.log(`Error: ${err}`))
   
               const ban_card = new Discord.MessageEmbed()
                   .setColor(10231598)
                   .setTitle(`Ban | ${member.user.tag}`)
                   .addField("User", member, true)
                   .addField("Moderator", message.author, true)
                   .addField("Reason", reason)
                   .setTimestamp()
   
               let auditLogs = message.guild.channels.cache.find(channel => channel.name === "audit-logs");
   
               auditLogs.send(ban_card);
            }
        } else {
            return message.channel.send({embed: {
                description: `You must have the following permission(s): ` + "`BAN MEMBERS`",
                color: 10231598,
                image: {
                    url: `attachment://no_perm.gif`,
                },
                files: [{
                    attachment: `./assets/no_perm.gif`,
                    name: `no_perm.gif`
                }],
                }
            }).then(msg => msg.delete({timeout: 2000}))
            .catch(err => console.log(`Error: ${err}`))
        }
    }
}