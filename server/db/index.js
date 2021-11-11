//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Plant = require('./models/Plant')
const Order = require('./models/Order')
const OrderPlant = require('./models/OrderPlant')


//associations could go here!
User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Plant, {through: OrderPlant})
Plant.belongsToMany(Order, {through: OrderPlant })


module.exports = {
  db,
  models: {
    User,
    Plant,
    Order
  },
}
