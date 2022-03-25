'use strict';
const DiscordCommand = require('../DiscordCommand.js');
const striptags = require('striptags');

class DiscordCommandMHelp extends DiscordCommand {

  constructor(subsystem) {
    super("mhelp", `reply to a mentorhelp`, 'mhelp', subsystem);
  }

  onRun(message, permissions, args) {
    let config = this.subsystem.manager.getSubsystem("Config").config;
    if (args.length < 2) {
      message.reply("Usage is `" + config.discord_command_character + "mhelp [CKey] <message>`");
      return;
    }
    let msg = striptags(args.slice(1).join(" "));
    let whom = striptags(args[0]);
    const request = "?mhelp=1&msg=" + encodeURIComponent(msg) + "&admin=" + encodeURIComponent("@" + message.author.username + "#" + message.author.discriminator) + "&admin_id=" + message.author.id + "&whom=" + encodeURIComponent(whom);
    this.subsystem.manager.getSubsystem("Byond Connector").request(request)
      .then(mhelpres => {
        if (!(+mhelpres)) {
          message.reply(`Error: Mentor-PM: Client ${whom} not found.`);
        }
      })
      .catch(message.channel.send);
  }
}

module.exports = DiscordCommandMHelp;
