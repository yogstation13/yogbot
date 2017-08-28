class UserPermissionManager {
  constructor() {
    this.permissions = require('../../config/admin.json');
  }

  getInheritedPermissions(group, currentPermissions) {
    if (group in this.permissions) {
      var groupConfig = this.permissions[group];
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

  getGroupPermissions(group) {
    var groupPermissions = this.getInheritedPermissions(group, []);

    return groupPermissions;
  }
}

module.exports = UserPermissionManager;
