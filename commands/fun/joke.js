const Discord = require(`discord.js`); //requires Discord.js integration package
const { Client, MessageEmbed } = require(`discord.js`); //for embed functionality
const emojiCharacters = require(`../emoji-characters`); //for emojis
const JOKES = require(`./jokes.json`); //for jokes
const jokes_list = JOKES.jokes;

module.exports = {
    name: 'joke',
    description: 'joke!',
    execute(message, args) { 
        function randomJoke() {
            return jokes_list[Math.floor(Math.random() * jokes_list.length)];
        }
        
        const embed = new MessageEmbed()
            .setTitle("Joke!")
            .setColor(10231598)
            .setDescription(randomJoke())
            .setTimestamp()
            .setFooter("Created by the server lords!")
        message.channel.send(embed)
    }
}