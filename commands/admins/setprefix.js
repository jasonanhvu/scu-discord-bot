const { Command } = require("discord.js-commando");
const fs = require("fs"); 
const { log } = require("../../functions/log.js");

module.exports = class setPrefixCommand extends Command {
  constructor(client) {
    super(client, {
      name: "setprefix",
      group: "admins",
      memberName: "setprefix",
      description: "Change the server prefix (mention will always work)",
      guildOnly: true,
      args: [
        {
          key: "newPrefix",
          prompt: "Please choose the new prefix you want to set.",
          type: "string",
          validate: (newPrefix) => {
            if(newPrefix.match(/^[a-zA-Z]+$/)) {
              return "Please enter a prefix without alphabet letters!";
            }
          }
        },
      ],
    });
  }

  async run(message, { newPrefix }) {
    if (this.client.config.prefix !== newPrefix) {
      let localConf = this.client.config;
      localConf.prefix = newPrefix;
      fs.writeFile("./config.json", JSON.stringify(localConf, null, 3), (err) => {
        if (err) { throw err; }
        log(this.client, { embed: { title: "CHANGED PREFIX!", description: `Successfully updated prefix to \`${newPrefix}\``, color: "GREEN"}});      
      })
       
    } else {
      this.client.error("That already is the current prefix!", message);
    }
  }
};