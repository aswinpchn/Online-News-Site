# Backend read me

## MySQL Database import

.sql to import is in the base folder.

Login into the server in workbench, Select server -> Data import.

Note: Was getting errors while importing at first. (<https://stackoverflow.com/questions/44015692/access-denied-you-need-at-least-one-of-the-super-privileges-for-this-operat)>

## MongoDB Database import

MongoDBDump.json has the Article Collection required in this application.

It should be in the cluster named "named" as named in the connection string (mongodb+srv://root:hackersaredangerous2020@cluster-9vcqy.mongodb.net/test?retryWrites=true&w=majority)

## log

1. Log4js is configured in config/logger.js (<https://stackoverflow.com/questions/37325667/does-es6-module-importing-execute-the-code-inside-the-imported-file)>

2. Look at DB to see the tables, views, stored procedures.

3. Views - <https://www.guru99.com/views.html>

4. Stored Procedures - Look at the Class slides.

## MongoDB

Here are the usecases that mongoDB is best suited for.
This will help in better design knowledge of when and where to use MongoDB.

<https://softwareengineering.stackexchange.com/questions/273340/when-to-use-a-nosql-database-such-as-mongodb-over-mysql>
<https://softwareengineering.stackexchange.com/questions/54373/when-would-someone-use-mongodb-or-similar-over-a-relational-dbms>
<https://softwareengineering.stackexchange.com/questions/325578/when-should-we-use-mongodb?newreg=39ef87f2f439417fbab95c02717247a2>

## Env

Env files are in mac storage.

## Encryption

Password is stored in a encrted format, while signing up and is tested after decryption during each login.
