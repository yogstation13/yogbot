const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandReboot extends DiscordCommand {

  constructor(subsystem) {
    super("reboot", "Reboot the bot.", 'reboot', subsystem);
  }

  onRun(message, permissions, args) {
    message.reply("Rebooting Bot.");
    process.exit();
  }

}

module.exports = DiscordCommandReboot;
