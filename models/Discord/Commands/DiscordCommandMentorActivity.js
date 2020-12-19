'use strict';
const DiscordCommand = require('../DiscordCommand.js');
const Discord = require('discord.js');

class DiscordCommandMentorActivity extends DiscordCommand {

	constructor(subsystem) {
		super("mentoractivity", "Mentor Activity", 'note', subsystem);
	}

	onRun(message, permissions, args) {
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
							
				let results = await query('SELECT ckey FROM erro_mentor'); // get the mentors
				let mentors = {};
				let mentorlen = 8;
				for(let mentor of results) {
					if(mentor.username.length > mentorlen)
						mentorlen = mentor.username.length;
				}
				
				results = await query ('SELECT ckey,Sum((Unix_timestamp(`left`)-Unix_timestamp(datetime))/3600) AS activity FROM erro_connection_log WHERE `left` > (Now() - INTERVAL 2 week) AND `left` IS NOT NULL GROUP BY ckey;'); // get the activity
				let activity = {};
				for(let user of results) {
					activity[user.ckey] = +user.activity;
				}
				
				let output = '```diff\n';
				let titleline = '  ';
				titleline += padCenter('Username', mentorlen, ' ') + ' ';
				titleline += padCenter('Rank', ' ') + 'Mentor';
				titleline += 'Activity ';
				output += titleline + '\n';
				output += ''.padStart(titleline.length, '=') + '\n';
				for(let [key, rank] of [...Object.entries(mentors)].sort((a, b) => {
					return (activity[ckey_ize(b[0])] || 0) - (activity[ckey_ize(a[0])] || 0);
				})) {
					let this_activity = activity[ckey_ize(key)] || 0;
					let line = key.padStart(mentorlen) + ' ';
					line += 'Mentor';
					line += (this_activity).toFixed(1).padStart(8);
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

module.exports = DiscordCommandMentorActivity;
