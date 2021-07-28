const dbConnection = require("../db")
const {DataTypes} = require("sequelize")

const List = dbConnection.define("list", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    runtime: {
        type: DataTypes.INTEGER,
        allowNull: false,
       
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    overview: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = List