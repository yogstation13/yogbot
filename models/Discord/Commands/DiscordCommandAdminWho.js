const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandAdminWho extends DiscordCommand {

  constructor(subsystem) {
    super("adminwho", "Get current admins online.", 'adminwho', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;

    byondConnector.request("?adminwho", function(results, error) {
      if(error) return message.reply(error);

      message.reply(results);
    });
  }

}

module.exports = DiscordCommandAdminWho;
