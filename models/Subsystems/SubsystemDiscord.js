const Subsystem = require('../Subsystem.js');
const Discord = require('discord.js');
const DiscordPermissionManager = require('../Discord/DiscordPermissionManager.js');
const DiscordBanManager = require('../Discord/DiscordBanManager.js');
const fs = require('fs');

class SubsystemDiscord extends Subsystem {
  constructor(manager) {
    super("Discord", manager);
    this.client = new Discord.Client();
    this.permissionManager = new DiscordPermissionManager(manager);
    this.banManager = new DiscordBanManager(this);

    this.commands = [];
    this.routers = [];
    this.channels = [];
  }

  setup(callback) {
    super.setup();

    var config = this.manager.getSubsystem("Config").config;
    this.client.login(config.discord_token).then(atoken => {
      this.loadCommands();
      this.banManager.setup();

      callback();
    }).catch((err) => {
      callback(err);
    });

    this.client.on('message', message => {
      this.processMessage(message);
    });
  }

  loadCommands() {
    fs.readdir("./models/Discord/Commands/", (err, files) => {
      files.forEach(file => {
        var commandPath = file.split(".")[0];

        const CommandClass = require('../Discord/Commands/' + commandPath + '.js');
        this.commands.push(new CommandClass(this));

      });
    });

    fs.readdir("./models/Discord/Routers/", (err, files) => {
      files.forEach(file => {
        var routerPath = file.split(".")[0];

        const RouterClass = require('../Discord/Routers/' + routerPath + '.js');
        var router = new RouterClass(this);
        this.routers.push(router);
      });
    });

    fs.readdir("./models/Discord/Channels/", (err, files) => {
      files.forEach(file => {
        var channelPath = file.split(".")[0];

        const ChannelClass = require('../Discord/Channels/' + channelPath + '.js');
        var channel = new ChannelClass(this);
        this.channels.push(channel);
      });
    });
  }

  processMessage(message) {
    if (message.author.bot) {
      return;
    }

    if (message.guild == undefined) {
      message.reply("You must use this bot in a guild.");
      return;
    }

    for (var channel of this.channels) {
      if (channel.id === message.channel.id) {
        channel.onMessage(message);
        return;
      }
    }

    //Make sure we have the command character and atleast one character more.
    if (message.content.length < 2) {
      return;
    }

    var firstCharacter = message.content.substring(0, 1);
    var content = message.content.substring(1);
    var config = this.manager.getSubsystem("Config").config;

    if (firstCharacter === config.discord_command_character) {
      var split = content.split(" ");

      var command = this.getCommand(split[0]);

      if (!command) {
        message.reply("We couldnt find that command, try using ` " + config.discord_command_character + "help` to see a list of commands.");
        return;
      }

      var guildMember = message.guild.fetchMember(message.author);
      guildMember.then(
        resolve => {
          var userPermissions = this.permissionManager.getUserPermissions(resolve);
          if (!command.hasPermission(userPermissions) && !(this.permissionManager.permissions["admins"].includes(message.author.id))) {
            message.reply("You dont have access to that command, if you believe this to be an error please contact your network admin.");
            return;
          }

          split.shift(); //Remove the first index.
          command.onRun(message, userPermissions, split);
        },
        reject => {
          message.reply("There seemed to be an error getting your GuildMember object, you should probably let someone know about this.")
        }
      );
    }
  }

  getCommand(commandName) {
    for (var command of this.commands) {
      if (command.name === commandName) {
        return command;
      }
    }

    return false;
  }

  getChannel(guild, channelID) {
    return guild.channels.get(channelID);
  }

  getLogChannel(guild) {
    for (var channel of guild.channels.array()) {
      if (channel.id === this.manager.getSubsystem("Config").config.discord_log_channel) {
        return channel;
      }
    }
  }

  getFeedbackChannel(guild) {
    for (var channel of guild.channels.array()) {
      if (channel.id === this.manager.getSubsystem("Config").config.discord_public_log_channel) {
        return channel;
      }
    }
  }

  getPrimaryGuild() {
    for (var guild of this.client.guilds.array()) {
      if (guild.id === this.manager.getSubsystem("Config").config.discord_guild) {
        return guild;
      }
    }
  }

  isChannelRestricted(channel) {
    var restrictedChannels = this.manager.getSubsystem("Config").config.discord_restricted_channels;
    return restrictedChannels.includes(channel);
  }
}

module.exports = SubsystemDiscord;
