
const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Sellers = sequelize.define('seller', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
        

    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        
    }
    //ispremiumuser: Sequelize.BOOLEAN

})

module.exports = Sellers;
