const Express = require("express")
const db = require("./db")
const app = Express()

//!!Imports
const dbConnection =  require("./db")

dbConnection.authenticate()
.then(db => dbConnection.sync())
.then(() => {
    app.listen(4000, ()=> {
        console.log("[Server]: App is listening on port 4000");
    });
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`); 
});

