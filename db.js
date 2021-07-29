const Sequelize = require("sequelize")
const dbConnection = new Sequelize(`postgres://postgres:${process.env.db_Password}@localhost:5432/flick-list`)

module.exports = dbConnection

