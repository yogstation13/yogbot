const fs = require('fs');
const DiscordCommand = require('../DiscordCommand.js');
const crypto = require('crypto');
const {URLSearchParams, URL} = require("url");

class DiscordCommandVerify extends DiscordCommand {

  constructor(subsystem) {
    super("verify", "Verifies a connection between a Ckey and a Discord User", undefined, subsystem);
  }

  onRun(message, permissions, args) {
    const config = this.subsystem.manager.getSubsystem("Config").config;
    const {oauth_authorize_url, oauth_token_url, oauth_userinfo_url, http_public_path, oauth_client_id, oauth_client_secret} = config

    if(args.length < 1) {
      message.reply("Usage is " + config.discord_command_character + "verify [ckey]")
      return
    }
    const ckey = args.join(" ").toLowerCase().replace(/[^a-z@\d]/g, "")

    const state = crypto.randomBytes(8).toString("hex")

    const authorizeLink = new URL("api/verify", http_public_path)
    //This is not a security measure, CSRF protection is done by verifying that the end user is authenticating as the proper ckey
    authorizeLink.searchParams.set("state", state)

    const identity = {
      ckey: ckey,
      discordSnowflake: message.author.id,
      discordAvatar: message.author.avatarURL,
      discordTag: message.author.tag
    };
    this.subsystem.oauthState.set(state, identity)



    message.reply(`Click the following link to complete the linking process: ${authorizeLink}`)
  }

}

module.exports = DiscordCommandVerify;
