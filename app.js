const Express = require("express")
const app = Express()
require("dotenv").config()

//! Imports
const dbConnection = require("./db")
const controllers = require("./controllers");
const validateSession = require("./middleware/validate-session")

app.use(Express.json());
app.use("/user", controllers.userController)
app.use(validateSession)
app.use("/list", controllers.listController)


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


