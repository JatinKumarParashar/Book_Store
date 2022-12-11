const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Purchase=sequelize.define('purchase',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    bookId:{
        type:Sequelize.STRING,
        allowNull:false
    },
    customerId:{
        type:Sequelize.STRING,
        allowNull:false
    },
    sellerId:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports=Purchase;