const Subsystem = require('../Subsystem.js');
const Discord = require('discord.js');
const DiscordPermissionManager = require('../Discord/DiscordPermissionManager.js');
const fs = require('fs');
const winston = require('winston');
const https = require('https');
const StringUtils = require('../Utils/String.js');

class SubsystemDiscord extends Subsystem {
  constructor(manager) {
    super("Discord", manager);
    this.client = new Discord.Client();
	  this.permissionManager = new DiscordPermissionManager(manager);
    this.oauthState = new Map();
    this.logger;

    this.commands = [];
    this.routers = [];
  }

  setup(callback) {
    super.setup(callback);
    this.createLogger();

    var config = this.manager.getSubsystem("Config").config;
    this.client.login(config.discord_token).then(atoken => {
      this.loadCommands();
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
  }

  processMessage(message) {
    if (message.author.bot) {
      return;
    }

    if (message.guild == undefined) {
      return;
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

    if(message.mentions.roles.has(config.discord_jester_role)) {
      if(!message.member.roles.has(config.discord_jester_role)) {
        message.reply("It appears you have, for the first time, engaged in the dastardly action to ping Jester! For this crime you have been assigned the role of Jester. Congratulations on your promotion!");
        message.member.addRole(config.discord_jester_role);
      }
    }
    
    let prRegex = message.content.match(new RegExp("\\\[#([0-9]+)\\\]"))
    if(prRegex) {
      this.do_http("https://api.github.com/repos/yogstation13/Yogstation/pulls/" + prRegex[1]).then(response => this.postPR(JSON.parse(response), message.channel));
      this.do_http("https://api.github.com/repos/yogstation13/Yogstation/issues/" + prRegex[1]).then(response => this.postIssue(JSON.parse(response), message.channel));
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

  isPrimaryGuild(guild) {
    return guild.id === this.manager.getSubsystem("Config").config.discord_guild
  }

  isChannelRestricted(channel) {
    var restrictedChannels = this.manager.getSubsystem("Config").config.discord_restricted_channels;
    return restrictedChannels.includes(channel);
  }

  postPR(data, channel) {
    if(data.message) {
      return;
    }
    let changelog = this.compileChangelog(data)
    let state = "Closed";
    let embedColor = "FF0000"; // red = closed without merge

    if(data.state == "open") {
      embedColor = "00FF00"
      state = "Open"
    } else if(data.merged) {
      embedColor = "9541a5"
      state = "Merged"
    }

    let changelogString = "";
    if (changelog.error) {
      changelogString = "There was an error compilling changelog: " + changelog.error;
    }
    else {
      for (var item of changelog.changelog) {
        changelogString += ":" + item.emoji + ":: " + item.body + "\n";
      }
      if (changelogString.length > 800) {
        changelogString = "Too long to display.";
      }
    }

    let msgTitle = data.title.replace(/</g, '')
    let embed = new Discord.RichEmbed();
    embed.setAuthor(state + " Pull Request", "https://i.imgur.com/tpkgmo8.png");
    embed.setDescription(msgTitle)
    embed.addField("Author", data.user.login, true);
    embed.addField("Number", "#" + data.number, true);
    embed.addField("Github Link", data.html_url, false);
    embed.setColor(embedColor);

    if (changelogString != "") {
      embed.addField("Changelog", changelogString, false);
    }

    channel.sendEmbed(embed)
  }

  postIssue(data, channel) {
    if(data.message || data.pull_request) {
      return;
    }

    let embedColor = "FF0000"; // red = closed without merge
    let state = "Closed"
    if(data.state == "open") {
      embedColor = "00FF00"
      state = "Open"
    }

    let msgTitle = data.title.replace(/</g, '')
    let embed = new Discord.RichEmbed();
    embed.setAuthor(state + " Issue", "https://i.imgur.com/tpkgmo8.png");
    embed.setDescription(msgTitle)
    embed.addField("Author", data.user.login, true);
    embed.addField("Number", "#" + data.number, true);
    embed.addField("Github Link", data.html_url, false);
    embed.setColor(embedColor);
    channel.sendEmbed(embed)
  }

  compileChangelog(data) {
    var body = StringUtils.replaceAll(data.body, "\r\n", "\n"); // Remove github line endings
    body = body.split("\n"); // Break the string into an array of lines

    var inCLTag = false;
    var changelog = [];
    var username = data.user.login;

    // Variables for catching changelog errors
    var foundOpeningTag = false;
    var foundClosingTag = false;

    for (var line of body) {
      line = line.trim();
      if (line.substring(0, 4) == ":cl:" || line.substring(0, 4) == "🆑") {
        inCLTag = true;
        foundOpeningTag = true;

        if (line.length > 4) {
          if (line.charAt(4) != " ") {
            return { error: "Changelog author field is incorrect." };
          }
        }

        var nameSpace = line.indexOf(" ");

        if (nameSpace > -1) {
          username = line.substr(nameSpace);
        }

        continue;
      }
      else if (line.substring(0, 5) == "/:cl:" || line.substring(0, 6) == "/ :cl:" || line.substring(0, 5) == ":/cl:" || line.substring(0, 5) == "/🆑" || line.substring(0, 6) == "/ 🆑" || line.substring(0, 5) == ":/🆑") {
        if (!inCLTag) {
          return { error: "Found end of changelog before beginning" };
        }
        inCLTag = false;
        foundClosingTag = true;
        continue;
      }

      if (!inCLTag) {
        continue;
      }

      var changelogType = line.split(" ")[0];
      var changelogText = "";
      var spacePos = line.indexOf(" ");

      if (nameSpace) {
        changelogType = line.substring(0, spacePos);
        changelogText = line.substring(spacePos + 1);
      }
      else {
        changelogText = line;
      }

      if (!changelogType.length || changelogType.charAt(changelogType.length - 1) != ":") {
        continue;
      }

      var cltype = changelogType.substring(0, changelogType.length - 1);

      switch (cltype) {
        case 'author':
          username = changelogText;
          break;
        case 'fix':
        case 'fixes':
        case 'bugfix':
          changelog.push({ 'type': 'bugfix', 'emoji': 'bug', 'body': changelogText });
          break;
        case 'wip':
          changelog.push({ 'type': 'wip', 'emoji': 'biohazard', 'body': changelogText });
          break;
        case 'rsctweak':
        case 'tweaks':
        case 'tweak':
          changelog.push({ 'type': 'tweak', 'emoji': 'wrench', 'body': changelogText });
          break;
        case 'soundadd':
          changelog.push({ 'type': 'soundadd', 'emoji': 'loud_sound', 'body': changelogText });
          break;
        case 'sounddel':
          changelog.push({ 'type': 'sounddel', 'emoji': 'mute', 'body': changelogText });
          break;
        case 'add':
        case 'adds':
        case 'rscadd':
          changelog.push({ 'type': 'rscadd', 'emoji': 'battery', 'body': changelogText });
          break;
        case 'del':
        case 'dels':
        case 'rscdel':
          changelog.push({ 'type': 'rscdel', 'emoji': 'octagonal_sign', 'body': changelogText });
          break;
        case 'imageadd':
          changelog.push({ 'type': 'imageadd', 'emoji': 'art', 'body': changelogText });
          break;
        case 'imagedel':
          changelog.push({ 'type': 'imagedel', 'emoji': 'scissors', 'body': changelogText });
          break;
        case 'typo':
        case 'spellcheck':
          changelog.push({ 'type': 'spellcheck', 'emoji': 'pen_ballpoint', 'body': changelogText });
          break;
        case 'experimental':
        case 'experiment':
          changelog.push({ 'type': 'experiment', 'emoji': 'biohazard', 'body': changelogText });
          break;
        case 'tgs':
          changelog.push({ 'type': 'tgs', 'emoji': 'question', 'body': changelogText });
          break;
        default:
          return { error: cltype + " is not a recognized changelog option" };
      }
    }
    if (foundOpeningTag && !foundClosingTag) {
      return { error: "Changelog closing tag was never found" };
    }

    if (!foundOpeningTag) {
      return { error: "Changelog not found" };
    }

    var compiledChangelog = { "username": username, "changelog": changelog };
    return compiledChangelog;
  }

  do_http(url) {
    return new Promise((resolve, reject) => {
      let config = this.manager.getSubsystem("Config").config;
      https.get(url, {headers: {
        "Authorization": "Token " + config.github_token,
        "User-Agent": "Yogbot13"
      }} , (res) => {
        if(res.statusCode == 200) {
          res.setEncoding('utf8');
          let data = '';
          res.on('data', (chunk) => {data += chunk;});
          res.on('end', () => {
            resolve(data);
          })
        }
      });
    });
  }
}

module.exports = SubsystemDiscord;
