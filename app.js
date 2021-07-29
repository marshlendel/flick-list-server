const Express = require("express")
const app = Express()

//! Imports
const dbConnection = require("./db")

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(4000, ()=> {
            console.log("[Server] is listening on port 4000")
        })
    })
    .catch((err) => console.log(err))

console.log("test for rebase")