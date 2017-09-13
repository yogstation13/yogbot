const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandKay extends DiscordCommand {

  constructor(subsystem) {
    super("kay", "Removed due to public demand", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = ["http://labourman.co.za/wp-content/uploads/2016/06/demotion.jpg", "https://www.matrixgroup.net/thematrixfiles/wp-content/uploads/2013/06/demotion1.jpg", "http://thenobleheart.com/wp-content/uploads/2014/03/Demotion-r1.jpg", "http://i.imgur.com/RHS5y8E.jpg", "http://i.imgur.com/oPQ9e1E.jpg", "http://corporatecrossovers.com/wp-content/uploads/2014/11/lady-demotion-300x294.jpg"];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandKay;
