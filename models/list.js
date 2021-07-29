const dbConnection = require("../db")
const {DataTypes} = require("sequelize")

const List = dbConnection.define("list", {
    
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    overview: {
        type: DataTypes.STRING,
        allowNull: false
    },
    watched: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER
    }
})

module.exports = List