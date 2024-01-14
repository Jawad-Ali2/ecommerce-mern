// * // connects to the database
// const mysql = require("mysql2");

// * // Create pool keeps the connection open even after it's not being used
// * // Create connection closes connection after each query making (makes it inefficient)
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-js",
//   password: "root",
// });

// module.exports = pool.promise();

// Sequelize do the above steps implicitly so we don't need to write that code anymore
const Sequalize = require("sequelize");

// Database name, user name, password
const sequelize = new Sequalize("node-js", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
