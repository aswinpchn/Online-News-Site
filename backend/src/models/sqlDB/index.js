// SJSU CMPE 226 Fall 2019 TEAM1

`use strict`

var mysql = require('mysql2');

var con = mysql.createConnection({
	host: process.env.RDS_HOST,
	user: process.env.RDS_USER,
	password: process.env.RDS_PASSWORD,
	database: process.env.RDS_DATABASE,
	port: process.env.RDS_PORT
});

con.connect(function(err) {
	if (err) throw err;
	else console.log("MYSQL - Connected to server!");
});

module.exports = con;

/*
	
	If you are writing createConnection and query one after another, we can do that. (https://www.npmjs.com/package/mysql2#using-promise-wrapper)
	Note: I wanted to have centralized, single createConnection and I tried to user async/await for createConnection itself, but after long research I found that you cant do that.
	
	Solution:
		So what I am doing is that, I get normal mysql2 connection and then (MySQL2 exposes a .promise() function on Connections, to "upgrade" an existing non-promise connection to use promise)

		result = await SQLConnection.promise().query(query);
		console.log(result); // The result will be in format [rows, fields], so you have to read result[0] when using mysql2.query()
*/