const fs = require('fs');
const DiscordCommand = require('../DiscordCommand.js');
const crypto = require('crypto');

class DiscordCommandVerify extends DiscordCommand {

  constructor(subsystem) {
    super("verify", "Verifies a connection between a Ckey and a Discord User", undefined, subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    var byondConnector = this.subsystem.manager.getSubsystem("Byond Connector").byondConnector;
    if(args.length < 1) {
      message.reply("Usage is " + config.discord_command_character + "verify [ckey]")
      return
    }

    //Delete the old hash
    if(this.subsystem.verificationMapIDToHash.has(message.author.id)) {
      const hashtodelete = this.subsystem.verificationMapIDToHash.get(message.author.id);
      this.subsystem.verificationMapHashToIdentity.delete(hashtodelete)
      this.subsystem.verificationMapIDToHash.delete(message.author.id)
    }

    //Technically isn't a hash but it looks like one so im going to keep calling it that
    var hash;
    while(!hash) {
      const candidate = crypto.randomBytes(8).toString("hex");
      //This is silly, the chances of getting the same random value is near to nil but im paranoid ok
      if(!this.subsystem.verificationMapHashToIdentity.has(candidate)) {
        hash = candidate
      }
    }

    const identity = {
      ckey: args.join(" ").toLowerCase().replace(/[^a-z@\d]/g, ""),
      discordsnowflake: message.author.id
    };
    this.subsystem.verificationMapHashToIdentity.set(hash, identity);
    this.subsystem.verificationMapIDToHash.set(message.author.id, hash);

    message.reply(`Click here to complete the linking process <byond://game.yogstation.net:4133?discordlink=${hash}>`)
  }

}

module.exports = DiscordCommandVerify;
