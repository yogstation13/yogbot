const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandTicket extends DiscordCommand {

    constructor(subsystem) {
        super("ticket", "Get ticket information.", "note", subsystem);
    }

    onRun(message, permissions, args) {
		var config = this.subsystem.manager.getSubsystem("Config").config;
        if(args.length == 0) {
			message.reply(`Usage is \`${config.discord_command_character} ticket <help|get>\``);
            return;
		}

		switch(args[0]) {
			case "help":
				this.ticket_help(message, args);
				break;
			case "get":
				this.get_ticket(message, args);
				break;
			default:
				message.reply(`Unknown subcommand \`${ args[0] }\``);

		}
    }

	ticket_help(message, args) {
		var config = this.subsystem.manager.getSubsystem("Config").config;
		if(args.length < 2) {
			message.reply(`Gets information on a ticket from the database.\n\
				Use \`${config.discord_command_character}ticket help <subcommand>\` for help on a specific subcommand`);
			return;
		}
		switch(args[1]) {
			case "get":
				message.reply(`Gets either the content of a specific ticket from a round, or the list of tickets from that round\n\
								\tUsage: \`${config.discord_command_character}ticket get <round_id> [ticket_id]\``);
				break;
			default:
				message.reply(`Unkown subcommand \`${ args[1] }\``);
		}
	}

	get_ticket(message, args) {
		var config = this.subsystem.manager.getSubsystem("Config").config;
		if(args.length < 2) {
			message.reply(`Usage: \`${config.discord_command_character}ticket get <round_id> [ticket_id]\``);
			return;
		}

		const round_id = parseInt(args[1]);
		if(isNaN(round_id)) {
			message.reply("Round id must be a number");
			return;
		}
		
		const dbSubsystem = this.subsystem.manager.getSubsystem("Database");

		if(args.length < 3) { // No ticket id, just round id
			dbSubsystem.pool.getConnection((err, connection) => {
				if(err) {
					message.reply("Error connecting to database, try again later.");
					return;
				}

				connection.query("SELECT * FROM (\
									SELECT `tickets`.`ticket_id`, `tickets`.`ckey`, `tickets`.`a_ckey`, `interactions`.`text`, \
									RANK() OVER (PARTITION BY `tickets`.`ticket_id` ORDER BY `interactions`.`id`) as `rank` \
									FROM " + dbSubsystem.format_table_name("admin_tickets") + " as tickets \
									JOIN " + dbSubsystem.format_table_name("admin_ticket_interactions") + " interactions on tickets.id = interactions.ticket_id \
									WHERE `tickets`.`round_id` = ?\
								) as ticket_list WHERE ticket_list.`rank` = 1;", [round_id], (error, results, fields) => {
					if(error) {
						message.reply("Failed to get tickets");
						return;
					}

					if(results.length == 0) {
						message.reply("No tickets found for round " + round_id);
						return;
					}
					
					let ticket_list = "Tickets for round " + round_id + ":\n```";
					for(let i in results) {
						let result = results[i]
						ticket_list += `#${result.ticket_id}) ${result.ckey}: ${result.text}, ${result.a_ckey}\n`
					}
					ticket_list += "```"
					message.reply(ticket_list)
				});
			});
			return;
		}

		const ticket_id = parseInt(args[2]);
		if(isNaN(round_id)) {
			message.reply("Round id must be a number");
			return;
		}

		dbSubsystem.pool.getConnection((err, connection) => {
			if(err) {
				message.reply("Error connecting to database, try again later.");
				return;
			}

			connection.query("SELECT `interactions`.`when`, `interactions`.`user`, `interactions`.`text` \
							FROM " + dbSubsystem.format_table_name("admin_tickets") + " as tickets \
							JOIN " + dbSubsystem.format_table_name("admin_ticket_interactions") + " interactions on tickets.id = interactions.ticket_id \
							WHERE `tickets`.`round_id` = ? AND `tickets`.`ticket_id` = ?;", [round_id, ticket_id], (error, results, fields) => {
				if(error) {
					message.reply("Failed to get tickets");
					return;
				}

				if(results.length == 0) {
					message.reply(`Unable to find ticket ${ticket_id} in round ${round_id}`);
					return;
				}
				
				let ticket_list = `Ticket ${ticket_id} for round ` + round_id + ":\n```";
				const time_opts = {
					hour12: false,
					hour: "numeric",
					minute: "numeric",
					seconds: "numeric"
				}
				for(let i in results) {
					let result = results[i]
					ticket_list += `${result.when.toLocaleTimeString("en-US",time_opts)}: ${result.user}: ${result.text}\n`
				}
				ticket_list += "```"
				message.reply(ticket_list)
			});
		});
	}

}

module.exports = DiscordCommandTicket;
