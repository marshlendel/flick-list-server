const Express = require("express")
const app = Express()
require("dotenv").config()

//! Imports
const dbConnection = require("./db")
const controllers = require("./controllers");
const middleware = require("./middleware")


app.use(Express.json());
app.use(middleware.CORS)
app.use("/user", controllers.userController)
app.use(middleware.validateSession)
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


