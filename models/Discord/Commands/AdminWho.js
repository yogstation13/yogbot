const DiscordCommand = require('../DiscordCommand.js');
const StringUtils = require('../../Utils/String.js');

class DiscordCommandAdminWho extends DiscordCommand {

  constructor(subsystem) {
    super();
    this.name = "adminwho";
    this.description = "Get currently online admins.";
    this.permission = "adminwho";
    this.subsystem = subsystem;
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;
    var byondmessage = "?adminwho";

    if(message.channel.id == config.discord_channel_admin || message.channel.id == config.discord_channel_admemes || message.channel.id == config.discord_channel_council) {
      byondmessage += "&adminchannel=1"
    }
    byondConnector.request(byondmessage, (results) => {
      if('error' in results) {
        message.channel.send(results.error);
      } else {
        var adminwho = StringUtils.replaceAll(results.data, "\0", "");
        message.channel.send(adminwho);
      }
    });
  }

}

module.exports = DiscordCommandAdminWho;
