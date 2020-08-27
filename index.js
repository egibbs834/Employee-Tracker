// dependencies - mysql, inquirerJs, console.table
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql');

    // below: bring in Greg's suggestion of making a DAtabase class
// const Database = require('./lib/Database');
// useswitch case for inquirer prompts depending on option user selects

// MySQL database connection info (add your password)
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Tekken03",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    runApp()
});

function runApp(){

};

function menuOptions() {
    inquirer
        .prompt({
            type: "list", 
            name: "mainMenu", 
            message: "Choose Option: ", 
            choices: [
                "View Departments",
                "View Roles",
                "View Employees", 
                "Add Department",
                "Add Role",
                "Add Employee", 
                "Update Employee's Role"
            ]
        })
        .then(answer => {
            switch(answer.mainMenu){
                case "View Departments":
                viewDepartments();
                break;

                case "View Roles":
                viewRoles();
                break;

                case "View Employees":
                viewEmployees();
                break;

                case "Add Department":
                addDepartment();
                break;

                case "Add Role":
                addRole();
                break;

                case "Add Employee":
                addEmployee();
                break;

                case "Update Employee's Role":
                updateEmpRole();
                break;

                // need an exit option
            }
        });
}