'use strict';
const DiscordCommand = require('../DiscordCommand.js');
const Discord = require('discord.js');

class DiscordCommandReview extends DiscordCommand {

	constructor(subsystem) {
		super("review", "Check the ckey inputted for related ckeys.", 'note', subsystem);
	}

	onRun(message, permissions, args) {
		let config = this.subsystem.manager.getSubsystem("Config").config;
		if (args.length < 1) {
			message.channel.send("Usage is `" + config.discord_command_character + "review [ckey]`");
			return;
		}
		let ckey = args.join("");
		ckey = ckey.toLowerCase().replace(/\.,-_;:/gi, "");
		let ckeys_queue = [];
		let ckeys_checked = new Map();
		ckeys_queue.push(ckey);
		ckeys_checked.set(ckey, "Original ckey");

		let dbSubsystem = this.subsystem.manager.getSubsystem("Database");

		dbSubsystem.pool.getConnection(async (err, connection) => {
			if (err) {
				message.reply("Error contacting database, try again later.");
			}
			function query(q, a = []) { // why did you pick an SQL library with no promise support reeeeeeeeee
				return new Promise((resolve, reject) => {
					connection.query(q, a, (error, results) => {
						if(error)
							reject(error);
						else
							resolve(results);
					});
				});
			}
			let limiter = 30;
			while(ckeys_queue.length) {
				limiter--;
				if(limiter <= 0)
					break;
				let this_ckey = ckeys_queue.shift();
				let results = await query('SELECT computerid,ip FROM `erro_connection_log` WHERE ckey = ?', [this_ckey]);
				let this_cids = new Set();
				let this_ips = new Set();
				for(let result of results) {
					this_cids.add(result.computerid);
					this_ips.add(result.ip);
				}
				let related_promises = [];
				related_promises.push(query('SELECT ckey,computerid FROM `erro_connection_log` WHERE computerid IN (?)', [[...this_cids]]));
				related_promises.push(query('SELECT ckey,ip FROM `erro_connection_log` WHERE ip IN (?)', [[...this_ips]]));
				let related_keys = new Map();
				let related_results = await Promise.all(related_promises); // do all the queries in parallel!
				for(let query_results of related_results) {
					for(let result of query_results) {
						if(ckeys_checked.get(result.ckey))
							continue;
						let entry = related_keys.get(result.ckey);
						if(!entry) {
							entry = {ips: new Set, cids: new Set()};
							related_keys.set(result.ckey, entry);
						}
						if(result.ip)
							entry.ips.add(result.ip);
						if(result.computerid)
							entry.cids.add(result.computerid);
					}
				}
				for(let [key, entry] of related_keys) {
					let str = `Related to ${this_ckey} via `;
					if(entry.cids.size)
						str += `cid${(entry.cids.size != 1 ? "s" : "")} ${[...entry.cids].join(", ")}`;
					if(entry.ips.size && entry.cids.size)
						str += ` and `;
					if(entry.ips.size)
						str += `ip${(entry.ips.size != 1 ? "s" : "")} ${[...entry.ips].join(", ")}`;
					ckeys_checked.set(key, str);
					ckeys_queue.push(key);
				}
			}
			let embed = new Discord.RichEmbed();
			embed.setAuthor("Account review:", "http://i.imgur.com/GPZgtbe.png");
			for(let [key, desc] of ckeys_checked) {
				embed.addField(key, desc);
			}
			message.channel.sendEmbed(embed);
		});
	}
}

module.exports = DiscordCommandReview;
