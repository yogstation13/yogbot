const DiscordCommand = require('../DiscordCommand.js');
const StringUtils = require('../../Utils/String.js');

class DiscordCommandListAdmins extends DiscordCommand {

    constructor(subsystem) {
        super("listadmins", "Get current admins.", undefined, subsystem);
    }

    onRun(message, permissions, args) {
        var config = this.subsystem.manager.getSubsystem("Config").config;
        if (args.length > 0) {
            message.reply("Usage is `" + config.discord_command_character + "listadmins`");
            return;
        }

        var dbSubsystem = this.subsystem.manager.getSubsystem("Database");

        dbSubsystem.pool.getConnection((err, connection) => {
            if (err) {
                message.reply("Error contacting database, try again later.");
            }
            connection.query('SELECT ckey,rank FROM `' + dbSubsystem.format_table_name('admin') + '`', [], (error, results, fields) => {
                if (error) {
                    message.reply("Error running select query, try again later.");
                    return;
                }
                if (results.length == 0) {
                    message.reply("No Admins.. Contact a coder or hire some");
                    return;
                }
                message.reply("Current Admins:\n" +  results.map(result => result.ckey + " - " + result.rank).join('\n'))
            })
        });
    }

}

module.exports = DiscordCommandListAdmins;