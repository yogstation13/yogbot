'use strict';
const DiscordCommand = require('../DiscordCommand.js');
const striptags = require('striptags');

class DiscordCommandMHelp extends DiscordCommand {

  constructor(subsystem) {
    super();
    this.name = "mhelp";
    this.description = "reply to a mentorhelp";
    this.permission = "mhelp";
    this.subsystem = subsystem;
  }
  
  onRun(message, permissions, args) {
	let byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;
    let config = this.subsystem.manager.getSubsystem("Config").config;
    if(args.length < 2) {
      message.reply("Usage is `" + config.discord_command_character + "mhelp [CKey] <message>`");
      return;
    }
    let msg = striptags(args.slice(1).join(" "));
	let whom = striptags(args[0]);
	byondConnector.request("?mhelp=1&msg=" + encodeURIComponent(msg) + "&admin=" + encodeURIComponent("@" + message.author.username + "#" + message.author.discriminator) + "&admin_id=" + message.author.id + "&whom=" + encodeURIComponent(whom), (results) => {
      if ('error' in results) {
        message.channel.send(results.error);
      } else if(!(+results.data)) {
	    message.reply(`Error: Mentor-PM: Client ${whom} not found.`);
	  }
    });
  }
}

module.exports = DiscordCommandMHelp;
