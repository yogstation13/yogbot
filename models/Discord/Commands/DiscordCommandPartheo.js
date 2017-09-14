const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandPartheo extends DiscordCommand {

  constructor(subsystem) {
    super("partheo", "Pictures of an arsonist", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = ["http://app.pomaki.com/wp-content/uploads/2016/06/sprite-soda-can.jpg", "https://i.imgur.com/sGIuy8c.jpg", "https://www.sprite.com/content/dam/sprite2016/sprite_logo_green2.png", "https://i.imgur.com/hQx6shr.png", "https://i.imgur.com/gYdx4Mu.png", "https://d1l5iy72tii4pp.cloudfront.net/wp-content/uploads/2016/11/Firefighter-Salary.jpg", "https://i.imgur.com/CnaXPZV.png", "https://i.imgur.com/mlv9srS.jpg", "https://i.imgur.com/O9ixYcd.jpg", "https://i.imgur.com/D3CV2jw.jpg", "http://25.media.tumblr.com/tumblr_m6azl24fiI1qmt0h8o1_500.jpg", "https://i.redd.it/l2xun0i7tvqy.png"];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandPartheo;
