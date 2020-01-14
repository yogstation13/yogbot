const Subsystem = require('../Subsystem.js');
const Discord = require('discord.js');
const DiscordPermissionManager = require('../Discord/DiscordPermissionManager.js');
const DiscordBanManager = require('../Discord/DiscordBanManager.js');
const DiscordForumManager = require('../Discord/DiscordForumManager.js');
const DiscordDonorManager = require('../Discord/DiscordDonorManager.js');
const fs = require('fs');
const winston = require('winston');

class SubsystemDiscord extends Subsystem {
  constructor(manager) {
    super("Discord", manager);
    this.client = new Discord.Client();
    this.permissionManager = new DiscordPermissionManager(manager);
    this.banManager = new DiscordBanManager(this);
    this.forumManager = new DiscordForumManager(this);
    this.donorManager = new DiscordDonorManager(this);
    this.logger;

    this.commands = [];
    this.routers = [];
    this.channels = [];
  }

  setup(callback) {
    super.setup();
    this.createLogger();

    var config = this.manager.getSubsystem("Config").config;
    this.client.login(config.discord_token).then(atoken => {
      this.loadCommands();
      this.banManager.setup();
      this.forumManager.setup();
      this.donorManager.setup();
	this.client.user.setGame("I AM GOD");
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
    var lowermsg = message.content.toLowerCase();
    if(lowermsg.indexOf("snail") != -1) {
      if(lowermsg.indexOf("when") != -1) {
        message.channel.send("When you code it");
      }
    }

	if(message.mentions.roles.has(config.discord_pingwhore_role)) {
		if(!message.member.roles.has(config.discord_pingwhore_role)) {
			message.reply("It appears you have, for the first time, engaged in the dastardly action to ping pingwhore! For this crime you have been assigned the role of pingwhore. Congratulations on your promotion!");
			message.member.addRole(config.discord_pingwhore_role);
		}
	}

    if (firstCharacter === config.discord_command_character) {
      var split = content.split(" ");

      var command = this.getCommand(split[0]);

      if (!command) {
        message.reply("We couldnt find that command, try using `" + config.discord_command_character + "help` to see a list of commands.");
        return;
      }

      var guildMember = message.guild.fetchMember(message.author);
      guildMember.then(
        resolve => {
          var userPermissions = this.permissionManager.getUserPermissions(resolve);
          if (!command.hasPermission(userPermissions) && !(this.permissionManager.permissions["admins"].includes(message.author.id))) {
            this.logger.log("info", message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ") tried to use the command " + config.discord_command_character + command.name + " but did not have permission.");
            message.reply("You dont have access to that command, if you believe this to be an error please contact your network admin.");
            return;
          }

          split.shift(); //Remove the first index.
          this.logger.log("info", message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ") used the command " + config.discord_command_character + command.name + " with the arguments \"" + split.join("\", \"") + "\"");
          command.onRun(message, userPermissions, split);

        },
        reject => {
          message.reply("There seemed to be an error getting your GuildMember object, you should probably let someone know about this.");
        }
      );
    }
  }

  createLogger() {
    var format = winston.format.printf(info => {
      return `${info.timestamp} [${info.level}]: ${info.message}`;
    });

    this.logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: "logs/discord.log",
          format: winston.format.combine(winston.format.timestamp(), format)
        })
      ]
    });
  }

  getCommand(commandName) {
    for (var command of this.commands) {
      if (command.name.toUpperCase() === commandName.toUpperCase()) {
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
      if (channel.id === this.manager.getSubsystem("Config").config.discord_channel_discord_mod_log) {
        return channel;
      }
    }
  }

  getFeedbackChannel(guild) {
    for (var channel of guild.channels.array()) {
      if (channel.id === this.manager.getSubsystem("Config").config.discord_channel_discord_public_log) {
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
