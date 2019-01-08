const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandFennecs extends DiscordCommand {

    constructor(subsystem) {
        super("fennec", "Pictures of the cutest animals in africa", undefined, subsystem, true);
    }

    onRun(message, permissions, args) {
        var responses = [
          "https://upload.wikimedia.org/wikipedia/commons/b/bd/10_Month_Old_Fennec_Fox.jpg",
          "http://www.workman.com/blog/wp-content/uploads/2014/12/Fennec-Fox-3.jpg",
          "https://40.media.tumblr.com/156284c02240921f49247afc7fc5a8ae/tumblr_ndq0igiqhI1s05o54o1_500.jpg",
          "http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/A-G/fennec-fox-hole.jpg.adapt.945.1.jpg",
          "https://www.lpzoo.org/sites/default/files/styles/animal_detail_main_image/public/feature_fennecfox.jpg?itok=zEXnN8IX",
          "https://kiza.eu/media/gallery/2014/Fennec-Augsburg_Zoo-IMG_0274.JPG",
          "https://upload.wikimedia.org/wikipedia/commons/9/9c/Fennec_Fox.jpg",
          "http://orig08.deviantart.net/f985/f/2011/339/8/9/8964a3716d9c119d7b97765c717d9c32-d4i9tsj.jpg",
          "http://i.imgur.com/GoNFtj8.png",
          "https://nationalzoo.si.edu/Animals/images/fennec_fox.jpg",
          "http://image.posta.com.mx/sites/default/files/wallpaper-fennec-fox-puppy.jpg",
          "http://blog.hdwallsource.com/wp-content/uploads/2016/03/fennec-fox-desktop-wallpaper-50931-52625-hd-wallpapers.jpg",
          "https://s-media-cache-ak0.pinimg.com/736x/2f/9b/5b/2f9b5bc999cade03308556e1003cf8bf.jpg",
          "https://pbs.twimg.com/media/ChOjSQDUgAARwLn.jpg"
        ];
        var response = responses[Math.floor(Math.random() * responses.length)];
        message.channel.send(response);
    }

}

module.exports = DiscordCommandFennecs;
