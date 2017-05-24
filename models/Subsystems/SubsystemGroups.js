const Subsystem = require('../Subsystem.js');

class SubsystemGroups extends Subsystem {
  constructor(manager) {
    super("Groups", manager);
    this.id = "Groups";

    this.groups = [];
  }

  setup() {
    super.setup();
    this.setStatus(2, "");
    /*global.link_pool.getConnection(function(err, connection) {
      connection.query('SELECT `rankid`,`name`,`permissions`,`byond` FROM `web_groups`', function (error, results, fields) {
        if(error) { setStatus(3, error); return; }
        for (var group in results) {
          groups.push(new Group(group.rankid, group.name, group.permissions, group.byond));
        }
        this.setStatus(2, "");
      });
    });*/
  }
}

module.exports = SubsystemGroups;
