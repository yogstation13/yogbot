const DiscordCommand = require('../DiscordCommand.js');
const StringUtils = require('../../Utils/String.js');

class DiscordCommandListMentors extends DiscordCommand {

    constructor(subsystem) {
        super("listmentors", "Get current mentors.", undefined, subsystem);
    }

    onRun(message, permissions, args) {
        var config = this.subsystem.manager.getSubsystem("Config").config;
        if (args.length > 0) {
            message.reply("Usage is `" + config.discord_command_character + "listmentors`");
            return;
        }

        var dbSubsystem = this.subsystem.manager.getSubsystem("Database");

        dbSubsystem.pool.getConnection((err, connection) => {
            if (err) {
                message.reply("Error contacting database, try again later.");
            }
            connection.query("SELECT ckey FROM `erro_mentor`", [], (error, results, fields) => {
                if (error) {
                    message.reply("Error running select query, try again later.");
                    return;
                }
                if (results.length == 0) {
                    message.reply("No mentors.. Contact a coder or hire some");
                    return;
                }
                message.reply("Current mentors: " + results.join(', '))
            })
        });
    }

}

module.exports = DiscordCommandListMentors;