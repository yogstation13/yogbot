const DiscordCommand = require('../DiscordCommand.js');
var Discord = require('discord.js');

class DiscordCommandReview extends DiscordCommand {

  constructor(subsystem) {
    super("Review", "Use this in admin-botspam", 'note', subsystem);
  }

  onRun(message, permissions, args) {
    var config = this.subsystem.manager.getSubsystem("Config").config;
    if (message.channel.id != config.discord_channel_admin_botspam) {
      message.channel.send("This command must be used in admin-botspam, as it can get quite spammy.");
    }
    if (args.length < 1) {
      message.channel.send("Usage is `" + config.discord_command_character + "review [ckey]`");
      return;
    }
    var ckey = args.join("");
    var punctuation = [".", ",", "-", "_", ";", ":"];
    for(var i = 0; i< punctuation.length; i++) {
      ckey = ckey.split(punctuation[i]).join("");
    }
    let ckeys2Check = [];
    let checkedCkeys = [];
    let ips2Check = [];
    let checkedIPs = [];
    let cids2Check = [];
    let checkedCIDs = [];
    
    ckeys2Check.push(ckey);
    
    var dbSubsystem = this.subsystem.manager.getSubsystem("Database");

    dbSubsystem.pool.getConnection((err, connection) => {
      if (err) {
        message.reply("Error contacting database, try again later.");
      }
      var check = 1;
      while(check) {
        var ckey2check;
        var ip2check;
        var cid2check;
        if(ckeys2Check.length) {
          
	  ckey2check = ckeys2Check[0];
	  connection.query('SELECT * FROM `erro_connection_log` WHERE `ckey` = ? ', [ckey2check], (error, results, fields) => {

	    for(var i = 0; i < results.length; i++) {
	      var result = results[i];
							
	      //let's check the IPs first.
	      var alreadyCheckingIP = 0;
	      for(var j = 0; j < ips2Check.length; j++) {
	        if(ips2Check[j] == result.ip) {
		  alreadyCheckingIP = 1;
		  break;
		}
	      }
	      for(var j = 0; j < checkedIPs.length; j++) {
		if(checkedIPs[j] == result.ip) {
		  alreadyCheckingIP = 1;
		  break;
		}
	      }
	      if(alreadyCheckingIP == 0) {
		ips2Check.push(result.ip);
	      }
							
	      //now let's check CIDs
	      var alreadyCheckingCID = 0;
	      for(var j = 0; j < cids2Check.length; j++) {
		if(cids2Check[j] == result.computerid) {
		  alreadyCheckingCID = 1;
		  break;
		}
	      }
	      for(var j = 0; j < checkedCIDs.length; j++) {
		if(checkedCIDs[j] == result.computerid) {
		  alreadyCheckingCID = 1;
                  break;
		}
	      }
	      if(alreadyCheckingCID == 0) {
	        cids2Check.push(result.computerid);
	      }
							
	    }
						
          });
	  checkedCkeys.push(ckey2check);
	  ckeys2Check.splice(0, 1);
				
	}
        if(ips2Check.length) {
				
	  ip2check = ips2Check[0];
	  connection.query('SELECT * FROM `erro_connection_log` WHERE `ip` = ? ', [ip2check], (error, results, fields) => {

	    for(var i = 0; i < results.length; i++) {
	      var result = results[i];
							
	      //let's check the ckeys first.
	      var alreadyCheckingCkey = 0;
              for(var j = 0; j < ckeys2Check.length; j++) {
	        if(ckeys2Check[j] == result.ckey) {
		  alreadyCheckingCkey = 1;
		  break;
	        }
	      }
	      for(var j = 0; j < checkedCkeys.length; j++) {
	        if(checkedCkeys[j] == result.ckey) {
		  alreadyCheckingCkey = 1;
		  break;
	        }
	      }
	      if(alreadyCheckingCkey == 0) {
	        ckeys2Check.push(result.ckey);
	      }
							
	      //now let's check CIDs
	      var alreadyCheckingCID = 0;
	      for(var j = 0; j < cids2Check.length; j++) {
	        if(cids2Check[j] == result.computerid) {
		  alreadyCheckingCID = 1;
		  break;
	        }
	      }
	      for(var j = 0; j < checkedCIDs.length; j++) {
	        if(checkedCIDs[j] == result.computerid) {
	          alreadyCheckingCID = 1;
		  break;
	        }
	      }
	      if(alreadyCheckingCID == 0) {
	        cids2Check.push(result.computerid);
	      }
							
	    }
						
	  });
	  checkedIPs.push(ips2Check);
	  ips2Check.splice(0, 1);
				
        }
	if(cids2Check.length) {
				
	  cid2check = ips2Check[0];
	  connection.query('SELECT * FROM `erro_connection_log` WHERE `computerid` = ? ', [cid2check], (error, results, fields) => {

	    for(var i = 0; i < results.length; i++) {
	      var result = results[i];
							
	      //let's check the ckeys first.
	      var alreadyCheckingCkey = 0;
	      for(var j = 0; j < ckeys2Check.length; j++) {
		if(ckeys2Check[j] == result.ckey) {
		  alreadyCheckingCkey = 1;
		  break;
		}
	      }
	      for(var j = 0; j < checkedCkeys.length; j++) {
	        if(checkedCkeys[j] == result.ckey) {
		  alreadyCheckingCkey = 1;
		  break;
		}
	      }
	      if(alreadyCheckingCkey == 0) {
		ckeys2Check.push(result.ckey);
	      }
							
	      //now let's check IPs
	      var alreadyCheckingIP = 0;
	      for(var j = 0; j < ips2Check.length; j++) {
	        if(ips2Check[j] == result.ip) {
		  alreadyCheckingIP = 1;
		  break;
	        }
	      }
	      for(var j = 0; j < checkedIPs.length; j++) {
	        if(checkedIPs[j] == result.ip) {
		  alreadyCheckingIP = 1;
		  break;
	        }
	      }
	      if(alreadyCheckingIP == 0) {
		ips2Check.push(result.ip);
	      }
							
	    }
						
	  });
	  checkedCIDs.push(ips2Check);
	  cids2Check.splice(0, 1);
				
        }
	if(ips2Check.length || ckeys2Check.length || cids2Check.length) {
	  check = 1;
	} else {
	  check = 0;
	}
      }

    });

    var embed = new Discord.RichEmbed();
    embed.setAuthor("Account review:", "http://i.imgur.com/GPZgtbe.png");
    embed.addField("Found ckeys:", checkedCkeys.join(", "));
    embed.addField("Found IPs:", checkedIPs.join(", "));
    embed.addfield("Found CIDs:", checkedCIDs.join(", "));
    message.channel.sendEmbed(embed);
  }

}

module.exports = DiscordCommandReview;
