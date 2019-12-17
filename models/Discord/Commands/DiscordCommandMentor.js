const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandMentor extends DiscordCommand {

    constructor(subsystem) {
        super("mentor", "Give/remove a mentor's rank", 'mentor', subsystem);
    }

        onRun(message, permissions, args) {
        var config = this.subsystem.manager.getSubsystem("Config").config;
        if (args.length < 2) {
            message.reply("Usage is `" + config.discord_command_character + "addao <add/remove> [ckey]`");
            return;
        }
        var removing = args[0];
        var ckey = args[1];

        var dbSubsystem = this.subsystem.manager.getSubsystem("Database");
        dbSubsystem.pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM `erro_mentor` WHERE `ckey` = ?', [ckey], (error, results, fields) => {
                if(results.length > 0) {
                    message.reply("Player is already a mentor.");
                    return;
                }
            });
            if(removing === "add") {
                connection.query('INSERT INTO `erro_mentor` (`id`, `ckey`) VALUES (?, ?)', [null], [ckey], (error, results, fields) => {
                    this.subsystem.logger.log("info", message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ") added a new mentor: " + ckey);
                    message.reply("`" + ckey + "` has been given mentor.");
                });
            } else if(removing === "remove") {
                connection.query('DELETE FROM `erro_mentor` WHERE `ckey` = ?', [ckey], (error, results, fields) => {
                    if(results.affectedRows < 1) {
                        this.subsystem.logger.log("info", message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ") removed a mentor: " + ckey);
                        message.reply("`" + ckey + "` has had their mentor revoked.");
                    }
                });
            }
            connection.release();
        });
    }
}

module.exports = DiscordCommandMentor;