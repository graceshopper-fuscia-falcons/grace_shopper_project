'use strict'

const {db, models: {User, Plant, Order} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')
  
  // Creating Users
  const cody = await User.create({ username: 'cody', password: '123456' })
  const murphy = await User.create({ username: 'murphy', password: '123456' })
  const moe = await User.create({ username: 'moe', password: '123456', isAdmin: true })

  const users = [cody, murphy, moe]
  
  //Creating Plants
  const bloomingLove = await Plant.create({
    name: 'Blooming Love™',
    flowerColor: 'red',
    flowerType: 'Rose',
    price: 7000,
    stock: 100,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/161132lx.jpg?width=545&height=597&quality=1&auto=webp&optimize={medium}'
  })
  
  const oceanBreezeOrchids = await Plant.create({
    name: 'Ocean Breeze Orchids',
    flowerColor: 'blue',
    flowerType: 'Orchids',
    price: 5000,
    stock: 80,
    imageUrl: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/140953mmdsv2wc2x.jpg?width=545&height=597&quality=1&auto=webp&optimize={medium}'
  })
  
  const harvestGlow = await Plant.create({
    name: 'Harvest Glow™',
    flowerColor: 'yellow',
    flowerType: 'Sunflowers',
    price: 2500,
    stock: 40,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/174303lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}'
  })
  const plants = [bloomingLove, oceanBreezeOrchids, harvestGlow]
  
  //Adding items to cart
  const order1 = await Order.findByPk(1)
  const association1 = await order1.addPlants(1, {through: {price: 7000}})
  const order2 = await Order.findByPk(2)
  const association2 = await order2.addPlants(2, {through: {price: 2500}})
  const order3 = await Order.findByPk(3)
  const association3 = await order3.addPlants(3, {through: {price: 2000}})

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${plants.length} plants`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
