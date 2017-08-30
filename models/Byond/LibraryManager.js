class BanManager {
  constructor(manager) {
    this.manager = manager;
  }

  fetchAvailableCategories(callback) {
    var config = this.manager.getSubsystem("Config").config;
    var query = "SELECT DISTINCT(`category`) FROM `" + config.sql_prefix + "library`";

    this.manager.getSubsystem("Database").pool.getConnection((err, connection) => {
      if (err) {
        return callback(err, undefined);
      }

      connection.query(query, (err, results) => {
        if (err) {
          return callback(err, undefined);
        }
        connection.release();

        var categories = [];

        results.forEach((row) => {
          categories.push(row.category);
        });

        callback(undefined, categories);
      });
    });
  }

  fetchBooks(options, callback) {
    this.manager.getSubsystem("Database").pool.getConnection((err, connection) => {
      if (err) {
        return callback(err, undefined);
      }

      var config = this.manager.getSubsystem("Config").config;
      var limit, page, category, order, showDeleted;

      limit = options.limit;
      page = options.page;
      category = options.category;
      order = options.order;
      showDeleted = options.showDeleted;

      var where = "";
      var query = "SELECT `id`, `author`, `title`, `category`, `datetime`";
      var queryArguments = [];

      if (showDeleted) {
        query += ", `deleted`";
      }

      query += " FROM `" + config.sql_prefix + "library`"

      if (category != "all") {
        where = " `category` = ?";
        queryArguments.push(category);
      }

      if (!showDeleted) {
        if (where != "") {
          where += " AND";
        }

        where += " `deleted` IS NULL";
      }

      if (where != "") {
        query += " WHERE " + where;
      }

      if (order) {
        if (order == "first") {
          query += " ORDER BY `datetime` ASC";
        }
        else if (order == "last") {
          query += " ORDER BY `datetime` DESC";
        }
      }
      else {
        query += " ORDER BY `datetime` DESC";
      }

      console.log(query)

      page--;

      query += " LIMIT ?, ?";
      queryArguments.push(page * limit);
      queryArguments.push((page + 1) * limit);

      connection.query(query, queryArguments, (err, results) => {
        if (err) {
          return callback(err, undefined);
        }

        callback(undefined, results);
        connection.release();
      });
    });
  }

  fetchBook(options, callback) {

    var id;
    var showDeleted = options.showDeleted;

    if (options.id) {
      id = options.id;
    }
    else {
      return callback("ID variable not set.", undefined);
    }

    var config = this.manager.getSubsystem("Config").config;
    var where = "";
    var query = "SELECT `id`, `author`, `title`, `content`, `category`, `datetime`";
    var queryArguments = [];

    if (showDeleted) {
      query += ", `deleted`";
    }

    query += " FROM `" + config.sql_prefix + "library`"
    where = "`id` = ?";
    queryArguments.push(id);

    if (!showDeleted) {
      if (where != "") {
        where += " AND";
      }

      where += " `deleted` IS NULL";
    }

    if (where != "") {
      query += " WHERE " + where;
    }

    query += " LIMIT 1";

    this.manager.getSubsystem("Database").pool.getConnection((err, connection) => {
      if (err) {
        return callback(err, undefined);
      }

      connection.query(query, queryArguments, (err, results) => {
        if (err) {
          return callback(err, undefined);
        }
        connection.release();

        callback(undefined, results[0]);
      });
    });
  }
}

module.exports = BanManager;
