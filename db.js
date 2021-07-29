const Sequelize = require("sequelize")
const dbConnection = new Sequelize("postgres://postgres:db_Password@localhost:5432/flick-list")

module.exports = dbConnection

