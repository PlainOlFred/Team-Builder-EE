const connection = require("./connection");

class Store {
  fetchAllTeams(cb) {
    connection.query("SELECT * FROM teams;", function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }

  createTeam(teamName, cb) {
    connection.query(
      `INSERT INTO teams (team_name) VALUES ("${teamName}")`,
      function (err, result) {
        if (err) {
          throw err;
        }

        cb(result);
      }
    );
  }

  viewTeam(teamId, cb) {
    connection.query(
      `SELECT * FROM teams WHERE team_id ="${teamId}"`,
      function (err, result) {
        if (err) {
          throw err;
        }

        cb(result);
      }
    );
  }
}

module.exports = Store;
