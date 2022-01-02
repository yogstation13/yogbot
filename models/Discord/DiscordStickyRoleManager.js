const fs = require('fs');

/**
 * Discord.JS GuildMember
 * @typedef {module:"discord.js".GuildMember} GuildMember
 */

class DiscordStickyRoleManager {
  constructor(subsystem) {
    this.subsystem = subsystem;

    this.load()
  }

  setup() {
  }

  /**
   * Load discord sticky role information
   */
  load() {
    /**
     * Saved sticky roles
     * @type {Map<number, string[]>}
     */
    // @ts-ignore
    this.stickyroles = new Map(require("../../data/stickyroles.json"))
  }

  /**
   * Save discord sticky role information
   */
  save() {
    fs.writeFile('./data/stickyroles.json', JSON.stringify([...this.stickyroles.entries()], null, 4), 'utf8', (error) => {
      if (error) {
        return this.subsystem.manager.logger.log("error", "Error saving discord stickyroles: " + error);
      }
      this.subsystem.manager.logger.log("debug", "Saved discord stickyroles file.");
    });
  }

  /**
   * Saves sticky roles of a user to disk
   * @param guildMember {GuildMember} User who left the server
   */
  saveRoles(guildMember) {
    const config = this.subsystem.manager.getSubsystem("Config").config;
    const feedbackChannel = this.subsystem.getFeedbackChannel(guildMember.guild);

    const userRoles = guildMember.roles.array().map(role => role.id)
    const roles = userRoles.filter(role => config.discord_stickyroles.includes(role))

    //No roles to save
    if(!roles.length) return

    this.stickyroles.set(guildMember.user.id, roles);
    this.save();

    guildMember.user.sendMessage(`You have left the ${config.server_name} server with ${roles.length} sticky role${roles.length > 1 ? "s" : ""}. They will be reapplied when you join. Note that temporary roles will not be removed if your ban expires before you rejoin the server.`);

    feedbackChannel.send(`**${guildMember.user.username}#${guildMember.user.discriminator}** left the server with ${roles.length} sticky role${roles.length > 1 ? "s" : ""}.`)
  }

  /**
   * Loads sticky roles for a user and deletes them from the database
   * @param guildMember {GuildMember} User who rejoined the sever
   */
  loadRoles(guildMember) {
    const config = this.subsystem.manager.getSubsystem("Config").config;
    const feedbackChannel = this.subsystem.getFeedbackChannel(guildMember.guild);

    /**
     * @type {string[] | null}
     */
    const roles = this.stickyroles.get(guildMember.user.id)

    //No sticky roles
    if(!roles || !roles.length) return

    feedbackChannel.send(`**${guildMember.user.username}#${guildMember.user.discriminator}** rejoined the server with ${roles.length} sticky role${roles.length > 1 ? "s" : ""}.`)
    guildMember.user.sendMessage(`You have left the ${config.server_name} server with ${roles.length} sticky role${roles.length > 1 ? "s" : ""}. They have been reapplied.`);
    for (const role of roles) {
      guildMember.addRole(role)
    }

    this.stickyroles.delete(guildMember.user.id)
    this.save();
  }
}

module.exports = DiscordStickyRoleManager;
