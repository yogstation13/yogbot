const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandSearch extends DiscordCommand {

  constructor(subsystem) {
    super("search", "search one of the repos for a string.", undefined, subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;

    if(args.length < 2) {
        message.channel.send("Usage is `" + config.discord_command_character + "search [yogbot/yogs] <search terms>`");
    }
    let searched = args[0].toLowerCase();
    for(var i = 1; i<args.length; i++) {
        args[i] = encodeURIComponent(args[i]);
    }
    let search = args.splice(1).join("+");
    let output;
    if(searched == "yogbot") {
        output = "https://github.com/yogstation13/yogbot/search?q=" + search
    } else if(searched == "yogs") {
        output = "https://github.com/yogstation13/yogstation/search?q=" + search
    }
    message.channel.send(output);
    message.delete(0);
    }
}

module.exports = DiscordCommandSearch;
