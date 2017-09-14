const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandKayozz extends DiscordCommand {

  constructor(subsystem) {
    super("kayozz", "Pictures of the only goodmin", undefined, subsystem, true);
  

  onRun(message, permissions, args) {
    var responses = [
		"https://i.giphy.com/media/u0dZqvLqw9FHW/giphy.mp4",
		"https://i.giphy.com/media/kgyt7vWYxecfe/giphy.mp4",
		"http://i.imgur.com/RZJIKU9.jpg",
		"https://images.halloweencostumes.com/products/21768/1-1/child-mime-costume.jpg",
		"http://i.imgur.com/GukvQc7.png",
		"http://img.freepik.com/free-photo/mime-shows-at-something-invisible-on-his-palm_1304-2808.jpg?size=338&ext=jpg",
		"https://cdn.heavencostumes.com.au/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/l/sl-s3066-hush-mime-french-jester-sexy-womens-costume-close.jpg",
		"https://farm2.static.flickr.com/1683/25344054344_71741837ac_m.jpg",
		"https://i.pinimg.com/originals/83/f8/03/83f8035b52d212cbd622930191f28ae8.jpg"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandKayozz;
