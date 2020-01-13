const https = require('https');

class DiscordDonorManager {
    constructor(subsystem) {
        this.subsystem = subsystem;
    }

    setup() {
        setInterval(() => {
            this.handleDonor();
        }, 60000);
        this.handleDonor();
    }

    handleDonor() {
        let guild = this.subsystem.getPrimaryGuild();
        let config = this.subsystem.manager.getSubsystem("Config").config;
        let dbSubsystem = this.subsystem.manager.getSubsystem("Database");
        dbSubsystem.pool.getConnection(async (err, connection) => {
            if (err) {
                this.subsystem.manager.logger.log("error", "Cannot contact database to update donor ranks.");
                return;
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

                let donor_role;
                for(let role of guild.roles.values()) {
                    if(role.name == "donator") {
                        donor_role = role;
                    }
                }

                if(!donor_role) {
                    throw "Cannot find donor role";
                }

                let results = await query('SELECT DISTINCT ckey FROM erro_donors WHERE (expiration_time > Now()) AND (revoked IS null);');
                let donor_ckeys = new Set();
                for(let {ckey} of results) {
                    donor_ckeys.add(ckey_ize(ckey));
                }
                results = await query('SELECT ckey, Cast(discord_id as char) as discord_id FROM erro_player WHERE discord_id IS NOT NULL;');
                let linked_discordids = new Set();
                for(let {ckey, discord_id} of results) {
                    ckey = ckey_ize(ckey);
                    let member = guild.members.get(discord_id);
                    linked_discordids.add(discord_id);
                    if(member) {
                        if(member.roles.has(donor_role.id) && !donor_ckeys.has(ckey)) {
                            this.subsystem.manager.logger.log("info", "Taking donor role from " + ckey + " (" + discord_id + ")");
                            await member.removeRole(donor_role);
                        } else if(!member.roles.has(donor_role.id) && donor_ckeys.has(ckey)) {
                            this.subsystem.manager.logger.log("info", "Giving donor role to " + ckey + " (" + discord_id + ")");
                            await member.addRole(donor_role);
                        }
                    } else if(donor_ckeys.has(ckey)) {
                        this.subsystem.manager.logger.log("error", "Cannot give donor role to ckey " + ckey + " discord id " + discord_id + " - discord ID not found");
                    }
                }
                let members_to_ping = [];
                try {
                    for(let [discord_id, member] of guild.members) {
                        if(!linked_discordids.has(discord_id) && member.roles.has(donor_role.id)) {
                            members_to_ping.push(discord_id);
                            await member.removeRole(donor_role);
                        }
                    }
                } finally {
                    if(members_to_ping.length) {
                        let msg = "";
                        for(let member of members_to_ping) msg += "<@" + member + "> ";
                        msg += "Your donator tag on discord has been removed because we could not verify your donator status.\n\nTo resolve this issue, you will need to link your discord and BYOND accounts. To do this, go in-game, and click the Link Discord Account in the Admin tab and follow the instructions."
                        guild.channels.get(config.discord_channel_staff_public).send(msg);
                    }
                }
            } catch(e) {
                this.subsystem.manager.logger.log("error", "Error updating donor ranks: " + e);
            } finally {
                connection.release();
            }
        });
    }
}

module.exports = DiscordDonorManager;
