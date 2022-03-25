const DiscordCommand = require('../DiscordCommand.js');
const StringUtils = require('../../Utils/String.js');

class DiscordCommandMentorWho extends DiscordCommand {

  constructor(subsystem) {
    super("mentorwho", "Get current mentors online.", undefined, subsystem);
  }

  onRun(message, permissions, args) {
    var byondmessage = "?mentorwho";


    this.subsystem.manager.getSubsystem("Byond Connector").request(byondmessage)
      .then(mentorwho => {
        message.channel.send(mentorwho);
      })
      .catch(message.channel.send)
  }

}

module.exports = DiscordCommandMentorWho;
