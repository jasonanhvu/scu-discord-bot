const Discord = require(`discord.js`); //requires Discord.js integration package
const config = require(`../config.json`);
let sendMessage = require(`../modules/sendMessage.js`);

module.exports = (client, message) => {
  // Checks if the Author is a Bot, or the message isn't from the guild, ignore it.
  if (message.author.bot || !message.guild) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(config.prefix)) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const command = client.commands.get(commandName);

  /*Some commands are meant to be used only inside servers and won't work whatsoever in DMs. 
  A prime example of this would be a kick command. You can add a property to the necessary 
  commands to determine whether or not it should be only available outside of servers.*/

  // If that command doesn't exist, return nothing
  if (!client.commands.has(`${commandName}`)) return;

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, <@${message.author.id}>!`;
    
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
    }
    
    return message.channel.send({embed: { title: "Uh-oh :x:", description: reply, color: config.school_color}});
  }

  const cooldowns = new Discord.Collection();

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000; //make cooldown default to 3 if there are no presets for cooldown in the command
  
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply({ embed: { description: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`, color: config.school_color}});
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {
  // Run the command as long as it has these two parameters
    command.execute(message, args);
  } catch(err) {
      sendMessage(client, config.channels.auditlogs, { embed: { description: `There was an error trying to run ${command.name} due the error: ${err.message}`}});
      return console.log(err.stack || err);
  }
}
