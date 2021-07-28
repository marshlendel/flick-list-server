const Express = require('express');
const app = Express();

//!Imports
const dbConnection = require("./db")

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(4000, () => {
            console.log(`[Server]: App is listening on 4000.`);
        })
    })
    .catch((err) => {
        console.log(`[Server]: Server Crashed. Error = ${err}`);
    });

