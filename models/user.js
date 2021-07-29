const {DataTypes} = require("sequelize");
const dbConnection = require("../db");

const User = dbConnection.define("user", {
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
});

module.exports = User;

