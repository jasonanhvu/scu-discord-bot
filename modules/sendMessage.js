module.exports.sendMessage = async (client, channel, content) => {
    client.guilds.cache.map((g) => {
      try {
        g.channels.cache.find((ch) => ch.id == channel || ch.name == channel).send(content);
      } catch (e) {
        return;
      }
    });
  }