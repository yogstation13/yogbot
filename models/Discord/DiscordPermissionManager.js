class DiscordPermissionManager {
  constructor(subsystemManager) {
    this.manager = subsystemManager;

    // @ts-ignore
    this.permissions = require('../../data/discord.json');
  }

  getInheritedPermissions(group, currentPermissions) {
    if (group in this.permissions['roles']) {
      var groupConfig = this.permissions['roles'][group];
      currentPermissions = currentPermissions.concat(groupConfig.permissions);
      if (groupConfig.inherits) {

        return this.getInheritedPermissions(groupConfig.inherits, currentPermissions);
      }
      else {
        return currentPermissions;
      }
    }

    return [];
  }

  getUserPermissions(guildMember) {
    var userPermissions = [];
    for (var role of guildMember.roles.array()) {

      var rolePermissions = this.getInheritedPermissions(role.name, []);
      userPermissions = userPermissions.concat(rolePermissions);

    }

    return userPermissions;
  }
}

module.exports = DiscordPermissionManager;
