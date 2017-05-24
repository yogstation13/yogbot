class Group {
  var id = 0;
  var name = "";
  var permissions = {};
  var users = [];

  constructor(id, name, permissions, users) {
    this.id = id;
    this.name = name;
    this.permissions = permissions;
    this.users = users;
  }

  addUser(user) {
    global.link_pool.getConnection(function(err, connection) {
      connection.query('SELECT `userid` FROM `webadmins` WHERE `userid` = ?', [user.id] , function (error, results, fields) {

        if(results.length < 1) { connection.release(); return; }
        if(error) {console.log(error); return; }

        connection.query('UPDATE `web_admins` SET `rank` = ? WHERE `userid` = ?', [id, user.id] , function (error, results, fields) {
          console.log("Updated user " + user.username + " with ID " + user.id + " set group to " + name + " of ID " + id);
          connection.release();
        }
      });
    });
  }
}
