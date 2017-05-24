class GroupManager {
  var
  var groups = [];

  constructor() {
    global.link_pool.getConnection(function(err, connection) {
      connection.query('SELECT `rankid`,`name`,`permissions`,`byond` FROM `web_groups`', function (error, results, fields) {
        if(error) { console.log(error); return; }
        for (var group in results) {
          groups.push(new Group(group.rankid, group.name, group.permissions, group.byond));
        }
      }
    }
  }
}
