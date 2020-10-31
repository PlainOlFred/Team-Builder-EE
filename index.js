const inquirer = require("inquirer");

const Store = require("./db/store");

const db = new Store();
main();

function main() {
  renderMainMenu();
}

function renderMainMenu() {
  console.log("Main Menu");
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuAction",
        message: "",
        choices: [
          {
            name: "View All Teams",
            value: "VIEW_ALL_TEAMS",
          },
          {
            name: "View A Team",
            value: "VIEW_TEAM",
          },
          {
            name: "Create A Team",
            value: "CREATE_TEAM",
          },
          {
            name: "Register Manager",
            value: "CREATE_MANAGER",
          },
          {
            name: "Register Player",
            value: "CREATE_PLAYER",
          },
        ],
      },
    ])
    .then(function ({ menuAction }) {
      switch (menuAction) {
        case "VIEW_ALL_TEAMS":
          return viewAllTeams();
        case "VIEW_TEAM":
          return viewTeam();
        case "CREATE_TEAM":
          return createTeam();

        default:
          exit();
      }
    });
}

function viewAllTeams() {
  /**
   * @DESC view all teams
   * @ACCESS public
   */

  console.log("fetching all teams...");
  db.fetchAllTeams(function (data) {
    console.table(data);
    renderMainMenu();
  });
}

function viewTeam() {
  /**
   * @DESC select a team to view stats
   * @ACCESS public
   */

  db.fetchAllTeams(function (data) {
    //   console.log(data)

    inquirer.prompt([
        { 
            type: "list",
            name: "selectedTeam",
            message: "Select a team to view",
            choices: data.map(team => ({name: team.team_name, value: team.team_id}))
           
        }
    ]).then(function({selectedTeam}) {
        db.viewTeam(selectedTeam, function(data) {
            console.table(data)
        })
    })
  });

    renderMainMenu();

}

function createTeam() {
  /** createTem
   * @DESC create a team
   * @ACCESS manger
   */

  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the team you would like to create?",
        name: "teamName",
      },
    ])
    .then(function ({ teamName }) {
      console.log(teamName);

      db.createTeam(teamName, function (data) {
        console.log(`${teamName} create successfully`);
      });

      renderMainMenu();
    })
    .catch(function (err) {
      console.log("Problem while trying to create team ", err);
    });
}
