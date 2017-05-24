const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandSallad extends DiscordCommand {

  constructor(subsystem) {
    super("sallad", "Something something potato", undefined, subsystem);
  }

  onRun(message, permissions, args) {
    var responses = [
      "http://www.selezionebarbroguaccero.se/Image/66033/698/459/sallad1-png",
      "http://www.hipp.no/uploads/pics/sallad_02.png",
      "http://www.mabra.com/wp-content/uploads/2016/11/sallad_med_paron.jpg",
      "http://www.funkytownboras.se/_imagebank/sallad.jpg",
      "http://subwayeatfresh.se/images/users/Subs/salad_veggie.jpg",
      "https://dailyinakitchen.files.wordpress.com/2014/07/img_2557.jpg",
      "http://receptfavoriter.se/sites/default/files/3160-sallad_med_granatapple_500x380.jpg",
      "https://images5.alphacoders.com/393/393394.jpg",
      "https://images5.alphacoders.com/415/415255.jpg"
    ];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response);
  }

}

module.exports = DiscordCommandSallad;
