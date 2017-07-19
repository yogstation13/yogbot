const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandDuck extends DiscordCommand {

  constructor(subsystem) {
    super("duck", "Pictures of the quack", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
      var responses = ["http://i.imgur.com/YjWIJHU.png",
      "http://i.imgur.com/SEoP3pC.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/1200px-Mallard2.jpg",
      "http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Birds/H-P/mallard-male-standing.adapt.945.1.jpg",
      "http://hunsci.com/data/out/129/581482.png",
      "http://www.michiganduckrescueandsanctuary.com/wp-content/uploads/2014/12/marold_donate_transparent_504.png",
      "http://i.imgur.com/IAWzbHm.png",
      "http://i.imgur.com/pZIeNmX.jpg",
      "http://i.imgur.com/4Ztso2W.png",
      "http://i.imgur.com/gpgeKaQ.png",
      "https://web.stanford.edu/dept/CTL/cgi-bin/academicskillscoaching/wp-content/uploads/2012/07/baby-duck.jpg",
      "http://i.imgur.com/LXn5gKI.png",
      "http://cdn1.uk.mentalfloss.com/sites/mentalflossuk/files/9/18//muscovy-duck-binns-img_3828-copy.jpg",
      "http://i3.kym-cdn.com/photos/images/original/001/248/525/3e4.jpg",
      "https://thenypost.files.wordpress.com/2017/05/ducks1.jpg",
      "http://seaduckjv.org/wp-content/wow-aqua-3/data1/images/hoodedmerganser.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Tunnel_of_ducks.jpg/1200px-Tunnel_of_ducks.jpg",
      "
    ];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandDuck;
