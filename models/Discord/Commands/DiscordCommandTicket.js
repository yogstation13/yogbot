const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandTicket extends DiscordCommand {

  constructor(subsystem) {
    super("ticket", "Various ticket commands.", 'ticket', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;

    var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;

    if(args.length < 1) {
      message.reply("Try using `" + config.discord_command_character + "ticket help`");
      return;
    }


    switch (args[0]) {
      case 'list':
        var request = "?ticket=1&action=list&key=" + config.server_key;
        byondConnector.request(request, function(results) {
          if('error' in results) {
            message.reply(results.error);
          } else {
            message.reply(results.data);
          }
        });

        break;
      case 'log':
          if(args.length < 2) {
            message.reply("Usage ``" + config.discord_command_character + "ticket log [TicketID]`");
            return;
          }

          var ticketID = args[1];

          if(isNaN(ticketID)) {
            message.reply(ticketID + " is not a valid integer.");
            return;
          }

          var request = "?ticket=1&action=log&id=" + ticketID + "&key=" + config.server_key;
          byondConnector.request(request, function(results) {
            if('error' in results) {
              message.reply(results.error);
            } else {
              message.reply(results.data);
            }
          });

          break;
        case 'reply':
            if(args.length < 3) {
              message.reply("Usage ``" + config.discord_command_character + "ticket reply [TicketID] [Message]`");
              return;
            }



            var ticketID = args[1];
            args.shift();
            args.shift();

            if(isNaN(ticketID)) {
              message.reply(ticketID + " is not a valid integer.");
              return;
            }

            var ticketResponse = args.join(" ");

            var request = "?ticket=1&action=reply&id=" + ticketID +"&admin=" + message.author.username + "&response=" + ticketResponse + "&key=" + config.server_key;
            console.log(request)
            byondConnector.request(request, function(results) {
              if('error' in results) {
                message.reply(results.error);
              } else {
                message.reply("Replied to ticket #" + ticketID);
              }
            });

            break;
      default:
        var response = "Available ticket commands:\n";
        response += "     `" + config.discord_command_character + "ticket help` - View ticket commands.\n";
        response += "     `" + config.discord_command_character + "ticket list` - List open tickets.\n";
        response += "     `" + config.discord_command_character + "ticket view` - View ticket replies.\n";
        response += "     `" + config.discord_command_character + "ticket reply` - Reply to ticket.\n";
        message.reply(response);
        break;
    }


  }

}

module.exports = DiscordCommandTicket;
