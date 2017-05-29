class DiscordCommand {

  constructor(name, description, permission, subsystem, hidden) {
    this.name = name;
    this.description = description;
    this.permission = permission;
    this.subsystem = subsystem;
    this.hidden = hidden;
  }

  onRun(user, args) {};

  hasPermission(permissions) {
    if(this.permission == undefined) {
      return true;
    }
    for (var i = 0; i < permissions.length; i++) {
      if(this.permission === permissions[i]){
        return true;
      }
    }
    return false;
  }
}

module.exports = DiscordCommand;
