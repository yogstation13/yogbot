const DiscordCommand = require('../DiscordCommand.js');
const StringUtils = require('../../Utils/String.js');

class DiscordCommandAdminWho extends DiscordCommand {

  constructor(subsystem) {
    super("adminwho", "Get current admins online.", 'adminwho', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;

    byondConnector.request("?adminwho", (results) => {
      if('error' in results) {
        message.reply(results.error);
      } else {
        var adminwho = StringUtils.replaceAll(results.data, "\0", "");
        message.reply(adminwho);
      }
    });
  }

}

module.exports = DiscordCommandAdminWho;
