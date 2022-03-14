'use strict';
const DiscordCommand = require('../DiscordCommand.js');
const Discord = require('discord.js');

class DiscordCommandActivity extends DiscordCommand {

	constructor(subsystem) {
		super("activity", "Activity fun.", 'note', subsystem);
	}

	onRun(message, permissions, args) {
		const exempt_ranks = ["Host", "Council Member", "RetCoder", "Tribunal", "Retired Admin", "Senior Coder", "Head Developer", "Maintainer", "Admin Observer", "#Forum Mod", "Bot", "Community Manager"];
		const ingore_ranks = ["Maintainer", "Bot"];
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
				
				let results = await query ("/*\nMIT License\n\nCopyright (c) 2021 alexkar598\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n*/\n\nSELECT adminlist.ckey                                                  as 'Ckey',\n       COALESCE(round((SELECT SUM(rolelog.delta)\n              FROM " + dbSubsystem.format_table_name('role_time_log') + " as rolelog\n              WHERE rolelog.ckey = adminlist.ckey\n                AND rolelog.job = 'Admin'\n                AND rolelog.datetime > (Now() - INTERVAL 2 week)) / 60, 1), 0) as Activity,\n       adminlist.rank                                                  as AdminRank\nFROM " + dbSubsystem.format_table_name('admin') + " as adminlist\n         JOIN " + dbSubsystem.format_table_name('admin_ranks') + " as ranklist ON adminlist.rank = ranklist.`rank`;"); // get the activity
				let admins = {};
				let activity = {};
				let adminlen = 8;
				let ranklen = 4;
				for(let admin of results) {
					if(ingore_ranks.includes(admin.AdminRank))
						continue;
					admins[admin.Ckey] = admin.AdminRank;
					activity[ckey_ize(admin.Ckey)] = +admin.Activity;

					if(admin.Ckey.length > adminlen)
						adminlen = admin.Ckey.length;
						console.log("Adminlen " + adminlen)
					if(admin.AdminRank.length > ranklen)
						ranklen = admin.AdminRank.length;
						console.log("Ranklen " + ranklen)
				}
				
				results = await query('SELECT ckey from ' + dbSubsystem.format_table_name('loa') + ' WHERE Now() < expiry_time && revoked IS NULL;'); // get LOA
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
