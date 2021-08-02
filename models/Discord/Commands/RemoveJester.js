const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandRemoveJester extends DiscordCommand {

  constructor(subsystem) {
    super();
    this.name = "removeJester";
    this.description = "Removes the jester role if you have it.";
    this.permission = undefined;
    this.subsystem = subsystem;
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if(message.member.roles.has(config.discord_jester_role)) {
      message.member.removeRole(config.discord_jester_role);
      message.reply("Success! But beware if you violate the sacred Jester Oath by daring to ping Jester once again you shall be smited with a thousand YOGGERS!")
    }
  }

}

module.exports = DiscordCommandRemoveJester;
