const DiscordChannel = require('../DiscordChannel.js');
const request = require('request-promise-native');

class DiscordCommandBugReport extends DiscordChannel {

  constructor(subsystem) {
      var config = subsystem.manager.getSubsystem("Config").config;
      super(subsystem, config.discord_channel_bug_reports);
  }

  onMessage(message) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    //Split by line breaks, only splits on purposeful shift+enter in Discord.
    let lines = message.content.split("\n")

    //Title of issue
    let title = "";
    //Text body of issue
    let body = "";
    //Supplied round ID
    let round_id = "Not Supplied";
    //Supplied test merges
    let testmerges = "Not Supplied / None";
    //Images parsed from the Discord message relayed to GitHub
    let supplied_images = "";

    //Loop through every line
    for(let i = 0; i < lines.length; i++) {
      let line = lines[i]
      //Check for round ID
      let round_id_check = checkForIdentifier(line, "Round ID: ")
      if(round_id_check) {
        round_id = round_id_check
        continue;
      }
      //Check for test merges
      let test_merges_check = checkForIdentifier(line, "Testmerges: ")
      if(test_merges_check) {
        testmerges = test_merges_check
        continue;
      }
      //Check for title
      let title_check = checkForIdentifier(line, "Title: ")
      if(title_check) {
        title = title_check
        continue;
      }
      //None of the above, we add it to the text body
      if(body) body += "\n"
      body += line;
    }

    if(!body || !title) {
      message.reply("No title/body detected in message. If this is a bug yell at someone!")
      return
    }

    //Make the Discord.js Collection into an array.
    let image_array = Array.from(message.attachments.values())
    //Loop through the array and add it to our string, ![SuppliedImage](url) is GitHub format for embedding images
    for(let i = 0; i < image_array.length; i++) {
      supplied_images += "\n![SuppliedImage](" + image_array[i].url+")"
    }
    //Format the issue
    let formatted_body = "## Round ID: " + round_id + "\n\n" +
    "## Test Merges: " + testmerges + "\n" +
    "## Reproduction:" + "\n" + body;

    if(supplied_images) {
      formatted_body += "\n ## Supplied Image:" + "\n" + supplied_images;
    }

    //Add the ID of the reporting user
    formatted_body += "\n Submitted by: " + message.author.username + "(" + message.author.id + ")"

    let request_info = {
      title: title,
      body: formatted_body
    }

    //Send the request
    var requestOptions = {
      //url: "https://api.github.com/repos/yogstation13/yogstation/issues",
      url: "https://api.github.com/repos/TheGameTeam/yogstation/issues",
      headers: {
        "Authorization": "token " + config.github_token,
        "User-Agent": "Yogbot13"
      },
      body: request_info,
      method: "POST",
      json: true
    };

    request(requestOptions).then((json) => {
      message.reply("Issue submitted. \n Link: <" + json.html_url + ">")
    }).catch((error) => {
      message.reply("Error: " + error.statusCode + "/" + error.error.message)
    });
  }

}

function checkForIdentifier(line, identifier) {
  let split_line = line.split(identifier);
  if(split_line.length > 1) {
    return split_line[1];
  }
}

module.exports = DiscordCommandBugReport;
