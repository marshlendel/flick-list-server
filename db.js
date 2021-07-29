const Sequelize = require("sequelize")
const dbConnection = new Sequelize("postgres://postgres:9dc167aa7aa448958824785de9ff46bb@localhost:5432/flick-list")


module.exports = dbConnection;


