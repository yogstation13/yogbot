class BanManager {
  constructor(manager) {
    this.manager = manager;
  }

  fetchBans(ckey, limit, page, order, callback) {
    this.manager.getSubsystem("Database").pool.getConnection((err, connection) => {
      if (err) {
        return callback(err, undefined);
      }

      var query = "SELECT `id`, `bantime`, `bantype`, `reason`, `job`, `expiration_time`, `ckey`, `a_ckey`, `unbanned`, `unbanned_datetime`, `unbanned_ckey` FROM `erro_ban`";
      var queryArguments = [];

      if (ckey) {
        query += " WHERE `ckey` = ?";
        queryArguments.push(ckey);
      }

      if (order) {
        if (order == "first") {
          query += " ORDER BY `bantime` ASC";
        }
      }
      else {
        query += " ORDER BY `bantime` DESC";
      }

      page--;

      query += " LIMIT ?, ?";
      queryArguments.push(page * limit);
      queryArguments.push((page + 1) * limit);

      var bans = [];
      var lastBan = undefined;

      connection.query(query, queryArguments, (err, results) => {
        if (err) {
          return callback(err, undefined);
        }

        results.forEach((ban) => {
          if (ban.bantype == "JOB_TEMPBAN" || ban.bantype == "JOB_PERMABAN" || ban.bantype == "JOB_ADMIN_PERMABAN" || ban.bantype == "JOB_ADMIN_TEMPBAN") {
            if (lastBan) {
              if (lastBan.reason == ban.reason) {
                lastBan.job.push(ban.job);
                return;
              }
            }
            else {
              var oldJobs = ban.job;
              ban.job = [];
              ban.job.push(oldJobs);
              lastBan = ban;
              return;
            }
          }
          else {
            if (lastBan) {
              bans.push(lastBan);
              lastBan = undefined;
            }
            bans.push(ban);
          }
        });

        callback(undefined, bans);
        connection.release();
      });
    });
  }
}

module.exports = BanManager;
