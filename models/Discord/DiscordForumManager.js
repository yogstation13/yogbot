const https = require('https');

class DiscordForumManager {
  constructor(subsystem) {
    this.subsystem = subsystem;
  }

  setup() {
    setInterval(() => {
      this.handleForum();
    }, 15000);
    this.handleForum();
  }

  async handleForum() {
    let guild = this.subsystem.getPrimaryGuild();
    let config = this.subsystem.manager.getSubsystem("Config").config;
    let ban_appeals_channel = guild.channels.get(config.discord_channel_ban_appeals);

    let admins = [];
    for(let member of guild.members.values()) {
      let is_admin = false;
      for(let role of member.roles.values()) {
        if(role.name == "staff" || role.name == "council" || role.name == "retmin") {
          is_admin = true;
          break;
        }
      }
      if(!is_admin) continue;
      admins.push(member);
    }
    let staff_id = "";
    let mentor_id = "";
    for(let role of guild.roles.values()) {
      if(role.name == "staff") {
        staff_id = role.id;
      } else if(role.name == "mentor") {
        mentor_id = role.id;
      }
    }

    function get_admin_ping(mentioned_name = "", default_to_staff = true) {
      let ckey = mentioned_name.toLowerCase().replace(/[^a-z0-9@]/gi, "");
      if(ckey) {
        for(let admin of admins) {
          if(admin.displayName.toLowerCase().replace(/[^a-z0-9@]/gi, "").startsWith(ckey)) {
            return "<@" + admin.id + ">";
          }
        }
      }
      if(default_to_staff == 2)
        return "<@&" + mentor_id + "> <@&" + staff_id + ">";
      else if(default_to_staff)
        return "<@&" + staff_id + ">";
      return "@?????"
    }

    handle_channel(config.discord_channel_ban_appeals, 'https://forums.yogstation.net/index.php?forums/ban-appeals.2/index.rss', /<a href="(.+)" class="link link--internal">(Ban Appeal - .+ - (.+) \[(?:.+ ban|Invalid Note Removal Request|Other)])<\/a><\/div>]]><\/content:encoded/g, 1, 2, 3);
    handle_channel(config.discord_channel_player_complaints, 'https://forums.yogstation.net/index.php?forums/player-complaints.3/index.rss', /<a href="(.+)" class="link link--internal">(.+)<\/a><\/div>]]><\/content:encoded/g, 1, 2, 3);
    handle_channel(config.discord_channel_admin_complaints, 'https://forums.yogstation.net/index.php?forums/administrator-complaints.4/index.rss', /<title>((.+) - report by .+)<\/title>\r?\n +<pubDate>.+<\/pubDate>\n +<link>(.+)<\/link>/g, 3, 1, 2, false);
    handle_channel(config.discord_channel_staff_applications, 'https://forums.yogstation.net/index.php?forums/administrator-applications.6/index.rss', /<title>(.+application)<\/title>\r?\n +<pubDate>.+<\/pubDate>\n +<link>(.+)<\/link>/g, 2, 1, -1);
    handle_channel(config.discord_channel_mentor_applications, 'https://forums.yogstation.net/index.php?forums/mentor-applications.206/index.rss', /<title>(.+application)<\/title>\r?\n +<pubDate>.+<\/pubDate>\n +<link>(.+)<\/link>/g, 2, 1, -1, 2);

    async function handle_channel(channel_id, url, regex, regex_url_index, regex_title_index, regex_ping_index, default_ping_staff = true) {
      let channel = guild.channels.get(channel_id);
      if(channel) {
        let text = await do_http(url);
        let messages_to_delete = [...(await channel.fetchMessages({limit:100})).values()];
        let regex_result;
        while((regex_result = regex.exec(text))) {
          let wanted_text = get_admin_ping(regex_result[regex_ping_index], default_ping_staff) + " `" + regex_result[regex_title_index] + "`\n        <" + regex_result[regex_url_index] + ">";

          let found_message = false;
          for(let i = 0; i < messages_to_delete.length; i++) {
            let message = messages_to_delete[i];
            if(message.content.includes(regex_result[regex_url_index])) {
              found_message = true;
              messages_to_delete.splice(i, 1);
              if(message.content != wanted_text) message.edit(wanted_text);
              break;
            }
          }
          if(found_message) {
            continue;
          }
          channel.send(wanted_text);
        }
        for(let message of messages_to_delete) message.delete();
      }
    }
  }
}

function do_http(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if(res.statusCode != 200) {
        reject(new Error('Got http code ' + res.statusCode + ' fetching ' + url));
        res.resume();
      } else {
        res.setEncoding('utf8');
        let data = '';
        res.on('data', (chunk) => {data += chunk;});
        res.on('end', () => {
          resolve(data);
        })
      }
    }).on('error', (e) => {reject(e);});
  });
}

module.exports = DiscordForumManager;
