const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'suggest',
    description: 'suggestions!',   
    async execute(message, args) {
        const announceInstructions = new Discord.MessageEmbed()
        .setColor(10231598)
        .setTitle("Suggestions Command")
        .addField("Description:", `Public suggestions to ping admins!`, true)
        .addField("Usage:", "`>suggest [insert title] | [insert description]`", true)
        .addField("Example:", ">suggest Hi! | Can I have more Wumpus?`")
        .setTimestamp();

        const prompt = args.join(' ').split('|');
        if(!prompt[2]) return message.channel.send(announceInstructions);
        
        const channel = message.guild.channels.cache.find(channel => channel.name === "suggestions")
        channel.send(`<@&709118762707845211> <@&710593727864897646>`,{embed : {color: 10231598, title: `${prompt[0]}`, description: `${prompt[1]}`}});
    }          
}