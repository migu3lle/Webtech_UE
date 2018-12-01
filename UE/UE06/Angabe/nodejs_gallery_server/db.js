let cfg = require('./config.json')
let mysql = require('mysql');

let _db;

let initDb = new Promise((resolve, reject) => {

    // make sure to import 'db_import/galleryDB.sql' into your MySQL database first
    _db = mysql.createConnection({
      host     : cfg.database.host,
      user     : cfg.database.user,
      password : cfg.database.password,
      database : cfg.database.db
    });

    //TODO EX1: connect to database and resolving/rejecting promise
    reject(); // replace with your code
});

function getDb() {
    if (!_db) {
        console.log("Db has not been initialized. Please call init first.");
        return;
    }
    return _db;
}

module.exports = {
    getDb,
    initDb
};
