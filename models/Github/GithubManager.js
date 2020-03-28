const crypto = require('crypto');
const fs = require('fs');
const request = require('request-promise-native');
const discord = require('discord.js');
const StringUtils = require('../Utils/String.js');

const MAXIMUM_CHANGELOG_LENGTH = 800;

class GithubManager {
  constructor(subsystemManager) {
    this.subsystemManager = subsystemManager;
    this.flags = [];
    this.knownUsers = require("../../data/github.json");

    this.loadFlags();
  }

  loadFlags() {
    fs.readdir("./models/Github/Flags", (err, files) => {
      if (err) {
        return this.subsystemManager.logger.log("error", err);
      }
      files.forEach(file => {
        var flagPath = file.split(".")[0];

        const FlagClass = require('./Flags/' + flagPath + '.js');
        this.flags.push(new FlagClass(this));
      });
    });
  }

  verifyGithubRequest(req) {
    if (!req.headers.hasOwnProperty("x-github-event")) {
      return { "error": "x-github-event header expected" };
    }
    if (!req.headers.hasOwnProperty("x-hub-signature")) {
      return { "error": "x-hub-signature header expected" };
    }

    var githubSignature = req.headers['x-hub-signature'];
    var config = this.subsystemManager.getSubsystem("Config").config;

    // Hash the payload and compare it to the github hash to confirm that the
    // payload has not been modified.
    var hmac = "sha1=" + crypto.createHmac("sha1", new Buffer(config.github_hmac)).update(req.body).digest('hex');

    if (hmac != githubSignature) {
      return { "error": "Invalid hub signature or payload modified." };
    }

    return true;
  }

  handlePullRequest(payload) {
    var action = payload.action;

    if (action != "opened" && action != "reopened" && action != "closed") {
      return;
    }

    // A closed pull request doesnt mean it hasnt been merged.
    if (payload.pull_request.merged) {
      action = "merged";
    }

    var changelog = this.compileChangelog(payload);
    var githubUser = this.getGithubUser(payload.pull_request.user.login);

    if (githubUser.prs || action == "merged") {
      this.sendDiscordPullRequestMessage(action, payload, changelog);
    }

    this.setPullRequestFlags(payload, changelog);

    if (action == "merged") {

      githubUser.prs++;
      this.setGithubUser(payload.pull_request.user.login, githubUser);
      if (changelog.error) {
        return;
      }
      var builtChangelog = this.buildChangelogObject(changelog);
      var branch = payload.pull_request.base.ref;
      var repo = payload.pull_request.base.repo.url;
      var fileName = "html/changelogs/AutoChangelog-pr-" + payload.pull_request.number + ".yml";
      var commit = "Automatic changelog generation #" + payload.pull_request.number + " [ci skip]";
      this.commitFile(repo, branch, commit, fileName, builtChangelog);

    }
  }

  sendDiscordPullRequestMessage(action, payload, changelog) {
    var embedColor = "FF0000"; // red = closed without merge

    switch (action) {
    case 'opened':
    case 'reopened':
      embedColor = "00FF00"; // green
      break;
    case 'merged':
      embedColor = "9541a5"; // purple
      break;
    default:
      break;
    }


    var config = this.subsystemManager.getSubsystem("Config").config;
    var discordSubsystem = this.subsystemManager.getSubsystem("Discord");
    var byondSS = this.subsystemManager.getSubsystem("Byond Connector");

    var changelogString = "";
    if (changelog.error) {
      changelogString = "There was an error compilling changelog: " + changelog.error;
    }
    else {
      for (var item of changelog.changelog) {
        changelogString += ":" + item.emoji + ":: " + item.body + "\n";
      }
    }
    var msgTitle = payload.pull_request.title.replace(/</g, '')
    var embed = new discord.RichEmbed();
    embed.setAuthor("A PR has been " + action + " by " + payload.sender.login, "https://i.imgur.com/tpkgmo8.png");
    embed.setDescription(msgTitle);
    embed.addField("Author", payload.pull_request.user.login, true);
    embed.addField("Number", "#" + payload.pull_request.number, true);
    embed.addField("Github Link", payload.pull_request.html_url, false);

    if (changelogString != "") {
      if (changelogString.length > MAXIMUM_CHANGELOG_LENGTH) {
        changelogString = "Too long to display.";
      }
      embed.addField("Changelog", changelogString, false);
    }
    embed.setColor(embedColor);
    
    var securearray = msgTitle.toLowerCase().split(" ")
    if(action == "opened" && !securearray.includes("[s]")) {
      byondSS.byondConnector.request("?announce=" + msgTitle + "&author=" + payload.sender.login + "&id=" + payload.pull_request.number, (results) => {});
    }

    for (var channel of discordSubsystem.getPrimaryGuild().channels.array()) {
      if(channel.id == config.discord_channel_botspam && payload.pull_request.user.login == "yogstation13-bot" && !securearray.includes("[s]")) {
        channel.sendEmbed(embed);
      }
      else if(channel.id == config.discord_channel_development_public && payload.pull_request.user.login != "yogstation13-bot" && !securearray.includes("[s]")) {
        channel.sendEmbed(embed);
      }
      else if(channel.id == config.discord_channel_important_admin && securearray.includes("[admin]")) {
        channel.sendEmbed(embed);
      }
      else if(channel.id == config.discord_channel_maintainer_chat && securearray.includes("[s]")) {
        channel.sendEmbed(embed);
      }
    }

    this.getFileExtensions(payload.pull_request).then((extensions) => {
      if(securearray.includes("[s]")) {
        return;
      }
      for(var channel of discordSubsystem.getPrimaryGuild().channels.array()) {
        if(channel.id == config.discord_channel_mapping && extensions.includes("dmm")) {
          channel.sendEmbed(embed);
        }
        else if(channel.id == config.discord_channel_spriter && extensions.includes("dmi")) {
          channel.sendEmbed(embed);
        }
      }
    });
  }

  setPullRequestFlags(payload, changelog) {
    this.getFileExtensions(payload.pull_request).then((fileExtensions) => {
      this.getPullRequestFlags(payload.pull_request).then((currentFlags) => {
        var flagsToApply = [];
        for (var flag of this.flags) {
          // Regex search for a string in the PR's body
          if (flag.checkRegex(payload.body)) {
            if (currentFlags.indexOf(flag.tag) < 0) {
              flagsToApply.push(flag.tag);
              continue;
            }
          }

          // Check if the PR modifies any extensions which are coupled with flags.
          if (flag.checkFileExtensions(fileExtensions)) {
            if (currentFlags.indexOf(flag.tag) < 0) {
              flagsToApply.push(flag.tag);
              continue;
            }
          }

          // See if the changelog has any acceptable change types
          if (flag.checkChangelog(changelog)) {
            if (currentFlags.indexOf(flag.tag) < 0) {
              flagsToApply.push(flag.tag);
              continue;
            }
          }

          // If all else fails then maybe some custom behaviour will add a flag
          if (flag.checkCustom(payload)) {
            if (currentFlags.indexOf(flag.tag) < 0) {
              flagsToApply.push(flag.tag);
              continue;
            }
          }
        }
        if (flagsToApply.length > 0) {
          var config = this.subsystemManager.getSubsystem("Config").config;

          var requestOptions = {
            url: payload.pull_request.issue_url + "/labels",
            headers: {
              "Authorization": "token " + config.github_token,
              "User-Agent": "Yogbot13"
            },
            body: flagsToApply,
            method: "POST",
            json: true
          };

          request(requestOptions).catch((err) => {
            this.subsystemManager.logger.log("error", err);
          });
        }
      }).catch((err) => {
        this.subsystemManager.logger.log("error", "Failed to fetch labels for PR " + payload.number + ": " + err);
      });
    }).catch((err) => {
      this.subsystemManager.logger.log("error", "Failed to fetch file extensions for PR " + payload.number + ": " + err);
    });
  }

  getPullRequestFlags(pullRequest) {
    return new Promise((resolve, reject) => {
      var requestOptions = {
        url: pullRequest.issue_url + "/labels",
        headers: {
          'User-Agent': 'Yogbot13'
        },
        json: true
      };

      request(requestOptions).then((json) => {
        var flags = [];
        for (var flag of json) {
          flags.push(flag.name);
        }
        resolve(flags);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  compileChangelog(payload) {
    var body = StringUtils.replaceAll(payload.pull_request.body, "\r\n", "\n"); // Remove github line endings
    body = body.split("\n"); // Break the string into an array of lines

    var inCLTag = false;
    var changelog = [];
    var username = payload.pull_request.user.login;

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

  buildChangelogObject(changelog) {
    var changelogFile = "author: \"" + StringUtils.replaceAllArray(changelog.username, ['\\\\', '"', "<"], ['\\\\', '\\\\\"', '']) + "\"\n"; //Add the author
    changelogFile += "delete-after: true \n"; // I dont see why you would ever have a changelog that doesnt delete itself.
    changelogFile += "changes: \n";

    for (var change of changelog.changelog) {
      var sanitizedBody = StringUtils.replaceAllArray(change.body, ['\\\\', '"'], ['\\\\\\', '\\\"']);
      changelogFile += "  - " + change.type + ": \"" + sanitizedBody + "\"\n";
    }

    return changelogFile;
  }

  commitFile(repo, branch, message, path, content) {
    var config = this.subsystemManager.getSubsystem("Config").config;

    var requestOptions = {
      url: repo + "/contents/" + path,
      headers: {
        "Authorization": "token " + config.github_token,
        "User-Agent": "Yogbot13"
      },
      body: {
        "branch": branch,
        "message": message,
        "content": new Buffer(content).toString("base64")
      },
      method: "PUT",
      json: true
    };

    request(requestOptions).catch((err) => {
      this.subsystemManager.logger.log("error", err);
    });
  }

  getFileExtensions(pullRequest) { // We should probably start using promises in other places.
    return new Promise((resolve, reject) => {

      var requestOptions = {
        url: pullRequest.url + "/files",
        headers: {
          'User-Agent': 'Yogbot13'
        },
        json: true
      };

      request(requestOptions).then((json) => {
        var filetypes = [];
        for (var file of json) {
          var filetype = file.filename.split(".");
          filetype = filetype[filetype.length - 1]; // Last string at the end of the array is the file extension
          filetypes.push(filetype);
        }
        resolve(filetypes);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getGithubUser(username) {
    var githubUser = this.knownUsers[username];
    if (!githubUser) {
      githubUser = {
        prs: 0,
        discord: undefined
      };

      this.knownUsers[username] = githubUser;
    }

    return githubUser;
  }

  setGithubUser(username, options) {
    this.knownUsers[username] = options;
    this.saveGithubUsers();
  }

  saveGithubUsers() {
    fs.writeFile('./data/github.json', JSON.stringify(this.knownUsers, null, 4), 'utf8', (error) => {
      if (error) {
        this.subsystemManager.logger.log("error", "Failed to save github users file: " + error);
      }
      this.subsystemManager.logger.log("debug", "Saved github users file.")
    });
  }
}

module.exports = GithubManager;
