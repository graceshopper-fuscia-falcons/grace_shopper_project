const Sequelize = require('sequelize')
const db = require('../db')

const Plant = db.define('plant', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    flowerColor: {
        type: Sequelize.ENUM(['red', 'blue', 'yellow']),
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
    }
})

module.exports = Plant;