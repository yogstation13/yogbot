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

                let results = await query('SELECT DISTINCT ckey FROM erro_donors WHERE (expiration_time > Now()) AND (revoked IS null);');
                let donor_ckeys = new Set();
                for(let {ckey} of results) {
                    donor_ckeys.add(ckey_ize(ckey));
                }
                results = await query('SELECT ckey, discord_id FROM erro_player WHERE discord_id IS NOT NULL;');
                for(let {ckey, discord_id} of results) {
                    ckey = ckey_ize(ckey);
                    let member = guild.members.get(discord_id);
                    if(member.roles.has(donor_role.id) && !donor_ckeys.has(ckey)) {
                        member.removeRole(donor_role);
                    } else if(!member.roles.has(donor_role.id) && donor_ckeys.has(ckey)) {
                        member.addRole(donor_role);
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
