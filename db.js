const Sequelize = require("sequelize")
const dbConnection = new Sequelize("postgres://postgres:pgsquirrel@localhost:5432/flick-list")

module.exports = dbConnection

