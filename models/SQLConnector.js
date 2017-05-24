var sql = require('mysql');

console.log("Establishing database connection.");
console.log("Creating database pool with " + global.app_config.sql_connections + " connections.");

var pool = sql.createPool({
  connectionLimit: global.app_config.sql_connections,
  host: global.app_config.sql_host,
  user: global.app_config.sql_user,
  password: global.app_config.sql_password
});

console.log("Established database connection.");

global.link_pool = pool;
