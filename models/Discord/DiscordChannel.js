class DiscordChannel {
  constructor(subsystem, id) {
    this.subsystem = subsystem;
    this.id = id;
  }

  onMessage(message) {}

}

module.exports = DiscordChannel;
