const Express = require("express")
const app = Express()

//! Imports
const dbConnection = require("./db")
const controllers = require("./controllers");

app.use(Express.json());
app.use("/list", controllers.listController)
app.use("/user", controllers.userController)

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


