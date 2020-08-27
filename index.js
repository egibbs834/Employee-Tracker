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
    // runApp()
});

// start the app here
// function runApp()
menuOptions();

// menu options for user using inquirer package
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

// create functions:

// view departments
function viewDepartments(){
    const query = `SELECT id, name FROM employees_db.department;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        //put departments into an array
        const data = [];
        for (let i = 0; i < res.length; i++) {
            data.push({
                "ID": res[i].id,
                "Departments": res[i].name
             });
        }
        // show all departments
        console.log(data);
        menuOptions();
    });
}

// view roles
function viewRoles(){
    const query = `SELECT id, title FROM employees_db.role;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        // put roles into an empty array
        const data = [];
        for (let i = 0; i < res.length; i++) {
            data.push({
                "ID": res[i].id,
                "Title": res[i].title
             });
        }
        // show all roles
        console.log(data);
        menuOptions();        
    });
}

function viewEmployees(){
    const query = `SELECT id, first_name, last_name, role.title FROM employees_db.employee;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        // put all employees into an empty array
        const data = [];
        for (let i = 0; i < res.length; i++) {
            data.push({
                "ID": res[i].id,
                "First": res[i].first_name, 
                "Last": res[i].last_name

             });
        }
        // show all roles
        console.log(data);
        menuOptions();        
    });
}


// addDepartment();
// addRole();
// addEmployee();
// updateEmpRole();