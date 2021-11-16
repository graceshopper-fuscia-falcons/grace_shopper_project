const Sequelize = require('sequelize')
const db = require('../db')

const defaultDescr = "This is a nice flower."

const Plant = db.define('plant', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    flowerColor: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    flowerType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            min:0,
            max: 100000
        }
    },
    imageUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            isUrl: true,
            notEmpty: true
        },
    },
    imageUrlsecondary: {
        type: Sequelize.TEXT,
        validate: {
            isUrl: true
        },
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 100
        }
    }
})

module.exports = Plant;