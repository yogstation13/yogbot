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
		let start_time = new Date().getTime();

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
			let the_message
			async function send_update(final = false) {
				let embed = new Discord.RichEmbed();
				embed.setAuthor("Account review:", "http://i.imgur.com/GPZgtbe.png");
				for(let [key, desc] of ckeys_checked) {
					embed.addField(key, desc);
				}
				if(final) {
					embed.addField("*Done!*", "Took " + ((new Date().getTime() - start_time)/1000) + " seconds")
				}
				embed.addField("WORKING...", "- " + ["-","_",".",",","*","&"][Math.floor(Math.random()*6)] + " -")
				if(the_message) {
					await the_message.edit("", embed);
				} else {
					the_message = await message.channel.send("", embed);
				}
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
				await send_update(false);
			}
			await send_update(true);
		});
	}
}

module.exports = DiscordCommandReview;
