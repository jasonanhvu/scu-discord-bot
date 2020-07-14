const Discord = require(`discord.js`); //requires Discord.js integration package
const {MessageEmbed} = require(`discord.js`);
const moment = require("moment");

module.exports = {
    name: 'user-info',
    description: 'Shows user info',
    inline: true,
	async execute (message, args) {

      let user = message.mentions.users.first() || message.author;
    
      if (user.presence.status === "dnd") user.presence.status = "Do Not Disturb";
      if (user.presence.status === "idle") user.presence.status = "Idle";
      if (user.presence.status === "offline") user.presence.status = "Offline";
      if (user.presence.status === "online") user.presence.status = "Online";
      
      function game() {
        let game;
        if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
        else if (user.presence.activities.length < 1) game = "None"; 
        return game; 
      }
      
      let x = Date.now() - user.createdAt; 
      let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt; 
      let created = Math.floor(x / 86400000);
      let joined = Math.floor(y / 86400000);
      
      const member = message.guild.member(user);
      let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "None"; 
      let createdate = moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss"); 
      let joindate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss"); 
      let status = user.presence.status; 
      let avatar = user.avatarURL({size: 2048}); 
      

      const embed = new MessageEmbed()
      .setTitle("User Infomation")
      .setColor(10231598)
      .setThumbnail(avatar)
      .addField("**User Info**", [
        `**• Username:** ${user.tag}`,
        `**• ID:** ${user.id}`,
        `**• Created at:** ${createdate}`,
        `**• Status:** ${status}`,
      ])

      .addField("**Member Info**", [
        `**• Nickname:** ${nickname}`,
        `**• Joined at:** ${joindate}`,
        `**• Role(s):** <@&${member._roles.join('> <@&')}>`,
      ])

      .addField("**Currently Playing**", game())
      
      return message.channel.send(embed); 

    }
}
