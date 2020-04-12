const DiscordCommand = require('../DiscordCommand.js');
const StringUtils = require('../../Utils/String.js');

class DiscordCommandMentorWho extends DiscordCommand {

  constructor(subsystem) {
    super("mentorwho", "Get current mentors online.", undefined, subsystem);
  }

  onRun(message, permissions, args) {
    var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;
    var byondmessage = "?mentorwho";

    
    byondConnector.request(byondmessage, (results) => {
      if('error' in results) {
        message.channel.send(results.error);
      } else {
        var mentorwho = StringUtils.replaceAll(results.data, "\0", "");
        message.channel.send(mentorwho);
      }
    });
  }

}

module.exports = DiscordCommandMentorWho;
