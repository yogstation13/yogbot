var APIEndpoint = require("../APIEndpoint")

module.exports = class EndpointVerify extends APIEndpoint {
    constructor(manager) {
        super(manager, "verify");
    }

    request(data, callback) {
        if(data.ckey === undefined) {
            const error = {
                status: 400,
                response: {status: "err", message: "Internal server error: Missing ckey parameter"}
            }

            return callback(error, undefined)
        }

        if(data.hash === undefined) {
            const error = {
                status: 400,
                response: {status: "err", message: "Internal server error: Missing hash parameter"}
            }

            return callback(error, undefined)
        }

        const discord = this.manager.subsystemManager.getSubsystem("Discord");
        const identity = discord.verificationMapHashToIdentity.get(data.hash)
        if(identity === undefined) {
            const error = {
                status: 400,
                response: {status: "err", message: "Verification code is invalid"}
            }

            return callback(error, undefined)
        }
        if(identity.ckey !== data.ckey) {
            const error = {
                status: 400,
                response: {status: "err", message: `Verification code links to ckey ${identity.ckey.toLowerCase()}, expected ${data.ckey.toLowerCase()}`}
            }

            return callback(error, undefined)
        }

        //We're done here
        discord.verificationMapIDToHash.delete(identity.discordsnowflake);
        discord.verificationMapHashToIdentity.delete(data.hash);
        
        const guild = discord.getPrimaryGuild();
        let verified_role;
        for(let role of guild.roles.values()) {
            if(role.name == "server/discord linked") {
                verified_role = role;
            }
        }
        if(verified_role) {
            guild.members.get(identity.discordsnowflake).addRole(verified_role);
        }

        const response = {
            status: 200,
            response: {
                status: "ok",
                message: identity.discordsnowflake
            }
        }

        return callback(undefined, response)
    }
}
