const DiscordCommand = require('../DiscordCommand.js');
const StringUtils = require('../../Utils/String.js');

class DiscordCommandAdminWho extends DiscordCommand {

  constructor(subsystem) {
    super("adminwho", "Get current admins online.", 'adminwho', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;
    var byondmessage = "?adminwho";

    if(message.channel.id == "134722036353204224" || message.channel.id == "378318242906636288" || message.channel.id == "134722015503319040") { //admin, admemes and council respectively
      byondmessage += "&adminchannel=1"
    }
    byondSS.byondConnector.request(byondmessage, (resultsadmin) => {
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
