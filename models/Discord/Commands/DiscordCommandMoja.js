const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandMoja extends DiscordCommand {

  constructor(subsystem) {
    super("Moja", "Wise words beyond mortal comprehension", undefined, subsystem, true);
  }

  onRun(message, permissions, args) {
    var responses = ["https://cdn.discordapp.com/attachments/734475284446707753/758262836869857300/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758262871200366612/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758262931279708170/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758262993002692608/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758263058430296074/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758263105204518922/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758263164940058664/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758263218979340318/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758263276613795880/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758263360801996831/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758263428342611968/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758263470117355560/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758263530969104394/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758263630197424148/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758263745985773588/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758263778721792030/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758263886427455538/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758263944790933514/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264013947404288/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264071765884989/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264135401865236/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264200157593600/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264299645960272/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264358995230740/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264444236333056/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264516282155028/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264570547535882/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264657525342208/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264743475019796/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264779910676480/ss13_yogurtgoescrazy.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264817252696064/image0.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264851062587422/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264927169019944/Clown_shuttle.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758264960337313802/mcdonalds.jpg",
        "https://cdn.discordapp.com/attachments/734475284446707753/758265102234943488/unknown.png",
        "https://cdn.discordapp.com/attachments/734475284446707753/758265354224271370/Moja.gif"
	];
    var response = responses[Math.floor(Math.random() * responses.length)];
    message.channel.send(response);
  }

}

module.exports = DiscordCommandOak;