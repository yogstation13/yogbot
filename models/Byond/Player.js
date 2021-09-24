class ByondPlayer {
  constructor(subsystemManager, details) {
    this.ckey = details.ckey;
    this.iphistory = details.iphistory;
    this.cidhistory = details.cidhistory;
    this.relatedckeys = details.relatedckeys;
    this.firstseen = details.firstseen;
    this.lastseen = details.lastseen;
    this.job_whitelisted = details.job_whitelisted;

    this.subsystemManager = subsystemManager;
  }

  static findPlayer(ckey, subsystemManager, results) {
    var dbSubsystem = subsystemManager.getSubsystem("Database");

    var details = {};

    details.ckey = ckey;

    dbSubsystem.pool.getConnection((err, connection) => {
      if (err) {
        results(true, undefined);
        return;
      }

      var error = false

      connection.query('SELECT * FROM `' + dbSubsystem.format_table_name('player') + '` WHERE `ckey` = ?', [ckey], (error, rows, fields) => {
        if (error) {
          error = true;
        }

        if (rows.affectedRows < 1) {
          error = true
        }
        else {
          details.firstseen = rows[0].firstseen
          details.lastseen = rows[0].lastseen
          details.job_whitelisted = rows[0].job_whitelisted
        }

        connection.query('SELECT DISTINCT `computerid` FROM `' + dbSubsystem.format_table_name('connection_log') + '` WHERE `ckey` = ?', [ckey], (error, rows, fields) => {
          if (error) {
            error = true;
          }

          details.cidhistory = []

          for (var row of rows) {
            details.cidhistory.push(row.computerid)
          }

          connection.query('SELECT DISTINCT `ip` FROM `' + dbSubsystem.format_table_name('connection_log') + '` WHERE `ckey` = ?', [ckey], (error, rows, fields) => {
            if (error) {
              error = true;
            }

            details.iphistory = []

            for (var row of rows) {
              details.iphistory.push(row.ip)
            }

            if (error) {
              results(true, undefined);
            }
            else {
              results(false, new ByondPlayer(subsystemManager, details));
            }
            connection.release();
          });
        });
      });
    });
  }
}

module.exports = ByondPlayer;
