const Express = require('express');
const app = Express();

app.use(Express.json());

const controllers = require("./controllers");

// app.use("/list", controllers.listModel)
// app.use("/user", controllers.userModel)

//! Imports

const dbConnection = require("./db")

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(4000, ()=> {
            console.log("[Server] is listening on port 4000")
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    })


