const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis

module.exports = { 
    name: 'foo',
    description: 'foo!!',
    execute(message, args) {
        const embed = new MessageEmbed()
            .setColor(10231598)
            .setTitle(`Foo`)
            .setDescription(emojiCharacters.bar + ` Bar!`)
            message.channel.send(embed);
    }
}