// dependencies - mysql, inquirerJs, console.table
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const password = require('./password');
const Database = require('./lib/Database');
// useswitch case for inquirer prompts depending on option user selects

// MySQL database connection
const database = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: password.password,
    database: "employees"
});

database.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + database.connection.threadId);
    
    database.getRows("employee", function(results){
        console.log(results);
    });
});

