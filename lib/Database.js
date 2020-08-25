// write SQL queries using constructor function and/or classes?
const mysql = require('mysql');

class Database {
    constructor(config) {
        // MySQL database connection
        this.connection = mysql.createConnection(config);
    }

    connect(callback) {
        this.connection.connect(callback);
    }   
    
    getRows(name, callback) {
        // whatever name we pass in it will grab that table, and all rows within that table
        this.connection.query(`SELECT * FROM ${name}`, function (error, results, fields){
            callback(results);
        })
    }
}

module.exports = Database;

// getName() {
    //     return this.name;
    // }
    // getId() {
    //     return this.id;
    // }
    // getEmail() {
    //     return this.email;
    // }
    // getRole() {
    //     return this.role;
    // }