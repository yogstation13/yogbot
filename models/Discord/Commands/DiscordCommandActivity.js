'use strict';
const DiscordCommand = require('../DiscordCommand.js');
const Discord = require('discord.js');

class DiscordCommandActivity extends DiscordCommand {

	constructor(subsystem) {
		super("activity", "Activity fun.", 'note', subsystem);
	}

	onRun(message, permissions, args) {
		const exempt_ranks = ["Host", "Council Member", "RetCoder", "Tribunal", "Retired Admin", "Senior Coder", "Head Coder", "Maintainer", "Admin Observer", "Bot"];
		let config = this.subsystem.manager.getSubsystem("Config").config;
		let dbSubsystem = this.subsystem.manager.getSubsystem("Database");

		dbSubsystem.pool.getConnection(async (err, connection) => {
			if (err) {
				message.reply("Error contacting database, try again later.");
			}
			try {
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
				
				function ckey_ize(key) {
					return key.toLowerCase().replace(/[^a-z0-9]/ig, '');
				}
				
				function padCenter(str, amt, type = ' ') {
					return (str + ''.padStart(Math.floor((amt - str.length)/2))).padStart(amt, type);
				}
				
				// alright time for a bunch of queries
				let results = await query('SELECT rankid,name FROM web_groups'); // get the admin ranks
				let ranks = {};
				let ranklen = 4;
				for(let rank of results) {
					ranks[+rank.rankid] = rank.name;
					if(rank.name.length > ranklen)
						ranklen = rank.name.length;
				}
				
				results = await query('SELECT username,rank FROM web_admins'); // get the admins
				let admins = {};
				let adminlen = 8;
				for(let admin of results) {
					let rankname = ranks[admin.rank];
					//if(!(exempt_ranks.includes(rankname)))
					admins[admin.username] = rankname
					if(admin.username.length > adminlen)
						adminlen = admin.username.length;
				}
				
				results = await query ('SELECT ckey,Sum((Unix_timestamp(`left`)-Unix_timestamp(datetime))/3600) AS activity FROM erro_connection_log WHERE `left` > (Now() - INTERVAL 2 week) GROUP BY ckey;'); // get the activity
				let activity = {};
				for(let user of results) {
					activity[user.ckey] = +user.activity;
				}
				
				results = await query('SELECT ckey from erro_loa WHERE Now() < expiry_time && revoked IS NULL;'); // get LOA
				let loa_admins = [];
				for(let admin of results) {
					loa_admins.push(ckey_ize(admin.ckey));
				}
				
				let output = '```diff\n';
				let titleline = '  ';
				titleline += padCenter('Username', adminlen, ' ') + ' ';
				titleline += padCenter('Rank', ranklen, ' ') + ' ';
				titleline += 'Activity ';
				output += titleline + '\n';
				output += ''.padStart(titleline.length, '=') + '\n';
				for(let [key, rank] of [...Object.entries(admins)].sort((a, b) => {
					return (activity[ckey_ize(b[0])] || 0) - (activity[ckey_ize(a[0])] || 0);
				})) {
					let loa = loa_admins.includes(ckey_ize(key));
					let this_activity = activity[ckey_ize(key)] || 0;
					let line = this_activity < 12 ? ((loa || exempt_ranks.includes(rank)) ? '  ' : '- ') : '+ ';
					line += key.padStart(adminlen) + ' ';
					line += rank.padStart(ranklen) + ' ';
					line += (this_activity).toFixed(1).padStart(8);
					if(loa) line += ' (LOA)';
					else if(exempt_ranks.includes(rank)) line += " (Exempt)";
					line += '\n';
					if(output.length + line.length > 1990) {
						output += '```';
						message.channel.send(output);
						output = '```diff\n';
					}
					output += line;
				}
				output += '```';
				message.channel.send(output);
			} catch (e) {
				message.reply("An e-roar has occured: "+e);
			} finally {
				connection.release();
			}
		});
	}
}

module.exports = DiscordCommandActivity;
