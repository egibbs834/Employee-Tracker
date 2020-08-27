// dependencies - mysql, inquirerJs, console.table
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql');

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
                "Update Employee's Role",
                "Delete Department",
                "Delete Role",
                "Delete Employee",
                "Exit"
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

                case "Delete Department":
                deleteDepartment();
                break;

                case "Delete Role":
                deleteRole();
                break;

                case "Delete Employee":
                deleteEmployee();
                break;

                case "Exit":
                end();
                break;
            }
        });
}

// #############################################
// FUNCTIONS
// #############################################

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
        console.table(data);
        menuOptions();
    });
}

// view roles
function viewRoles(){
    const query = `SELECT * FROM employees_db.role;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        // put roles into an empty array
        const data = [];
        for (let i = 0; i < res.length; i++) {
            data.push({
                "ID": res[i].id,
                "Title": res[i].title,
                "Salary": res[i].salary,
                "Department ID": res[i].department_id
             });
        }
        // show all roles
        console.table(data);
        menuOptions();        
    });
}

// view all employees
function viewEmployees(){
    const query = `SELECT * FROM employees_db.employee;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        // put all employees into an empty array
        const data = [];
        for (let i = 0; i < res.length; i++) {
            data.push({
                "ID": res[i].id,
                "First": res[i].first_name, 
                "Last": res[i].last_name,
                "role_id": res[i].role_id,
                "manager_id": res[i].manager_id
             });
        }
        console.table(data);
        menuOptions();        
    });
}

// add a department
function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            name: "departmentName",
            message: "Enter Department Name: "
   
        }).then(function (answer) {
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.departmentName], function (err, res) {
            if (err) throw err;
            console.log("Department Added");
            menuOptions();
        })
    });
}

// add a new role
function addRole() {
    inquirer
        .prompt([
            {
            type: "input",
            name: "roleName",
            message: "Enter New Role: "
            }, 
            {
            type: "input",
            name: "salary",
            message: "Enter Yearly Salary: "
            },
            {
            type: "input",
            name: "departmentID",
            message: "Enter Department ID: "
            }
        ])     
        .then(function (answer) {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", 
        [answer.roleName, answer.salary, answer.departmentID], function (err, res) {
            if (err) throw err;
            console.log("Role Added");
            menuOptions();
        })
    });
}

// add employee
function addEmployee() {
    inquirer
        .prompt([
            {
            type: "input",
            name: "firstName",
            message: "Enter Employee's First Name: "
            }, 
            {
            type: "input",
            name: "lastName",
            message: "Enter Employee's Last Name: "
            },
            {
            type: "input",
            name: "roleID",
            message: "Enter Employee's Role ID: "
            },
            {
            type: "input",
            name: "managerID",
            message: "Enter Employee's Manager ID: "
            }
        ])     
        .then(function (answer) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", 
        [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function (err, res) {
            if (err) throw err;
            console.log("Employee Added");
            menuOptions();
        })
    });
}

// update employee role
function updateEmpRole() {
    inquirer
        .prompt([
            {
            type: "input",
            name: "whichEmployee",
            message: "Enter ID# of Employee: "
            }, 
            {
            type: "input",
            name: "newRole",
            message: "Enter New Role: "
            }            
        ])     
        .then(function (answer) {
        connection.query("UPDATE employee SET role_id=? WHERE id=?", 
        [answer.newRole, answer.whichEmployee], function (err, res) {
            if (err) throw err;
            console.log("Role Added");
            menuOptions();
        })
    });
}

// delete department
function deleteDepartment() {
    inquirer
        .prompt({
            type: "input",
            message: "Enter Department Name:",
            name: "departmentName"
        })
        .then(function (answer) {
            connection.query("DELETE FROM department WHERE name=?", 
            [answer.departmentName], function (err, res) {
                if (err) throw err;
                console.log("Department Deleted");
                menuOptions();
            });
        });
}

// delete role
function deleteRole() {
    inquirer
        .prompt({
            type: "input",
            message: "Enter Role ID#:",
            name: "roleID"
        })
        .then(function (answer) {
            connection.query("DELETE FROM role WHERE id=?", 
            [answer.roleID], function (err, res) {
                if (err) throw err;
                console.log("Role Deleted");
                menuOptions();
            });
        });
}

// delete role
function deleteEmployee() {
    inquirer
        .prompt({
            type: "input",
            message: "Enter Employee ID#:",
            name: "employeeID"
        })
        .then(function (answer) {
            connection.query("DELETE FROM employee WHERE id=?", 
            [answer.employeeID], function (err, res) {
                if (err) throw err;
                console.log("Employee Deleted");
                menuOptions();
            });
        });
}

//function to end app
function end() {
    connection.end();
    process.exit();
}