`use strict`

var mysql = require('mysql');

var con = mysql.createConnection({
	host: "13.59.60.222",
	user: "root",
	password: "!by14CS053",
	database: "grubhub"
});

con.connect(function(err) {
	if (err) throw err;
	else console.log("Connected to server!");
});

module.exports = con;