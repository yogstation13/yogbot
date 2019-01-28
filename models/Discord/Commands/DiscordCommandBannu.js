'use strict';
const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandBannu extends DiscordCommand {

  constructor(subsystem) {
    super("bannu", `"""""Ban""""" a user.`, undefined, subsystem, true);
  }
  
  onRun(message, permissions, args) {
    let config = this.subsystem.manager.getSubsystem("Config").config;
    if(args.length < 1) {
      message.reply("Usage is `" + config.discord_command_character + "bannu [@UserName] <reason>`");
      return;
    }
    let reason = "NO RAISIN";
    if(args.length > 1) {
      reason = `"""""${args.slice(1).join(" ").toUpperCase()}"""""`;
    }
    message.channel.send(`${args[0]} HAS BEEN BANED 4 ${reason}!!!!!!`);
  }
}

module.exports = DiscordCommandBannu;
