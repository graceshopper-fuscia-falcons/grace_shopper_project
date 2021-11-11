const Sequelize = require('sequelize')
const db = require('../db')

const red = "red"
const blue = "blue"
const yellow = "yellow"
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
        type: Sequelize.ENUM([red, blue, yellow]),
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
        validate: {
            isUrl: true
        },
        defaultValue: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Bender_Rodriguez.png',
    },
    desription: {
        type: Sequelize.TEXT,
        defaultValue: defaultDescr
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