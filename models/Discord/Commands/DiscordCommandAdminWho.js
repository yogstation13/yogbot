const DiscordCommand = require('../DiscordCommand.js');
const StringUtils = require('../../Utils/String.js');

class DiscordCommandAdminWho extends DiscordCommand {

  constructor(subsystem) {
    super("adminwho", "Get current admins online.", 'adminwho', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    var byondmessage = "?adminwho";

    if(message.channel.id == config.discord_channel_admin || message.channel.id == config.discord_channel_admemes || message.channel.id == config.discord_channel_council) {
      byondmessage += "&adminchannel=1"
    }
    this.subsystem.manager.getSubsystem("Byond Connector").request(byondmessage)
      .then(data => {
        message.channel.send(data);
      })
      .catch(message.channel.send)
  }

}

module.exports = DiscordCommandAdminWho;
