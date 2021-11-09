const { green, red } = require('chalk');
const { db, User, Plant } = require('./server/db')

const seed = async () => {
    try {
        await db.sync({ force: true })

        await Plant.create({
            name: 'Blooming Love™',
            flowerColor: 'red',
            flowerType: 'Rose',
            imageURL: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/161132lx.jpg?width=545&height=597&quality=1&auto=webp&optimize={medium}'
        })

        await Plant.create({
            name: 'Ocean Breeze Orchids',
            flowerColor: 'blue',
            flowerType: 'Orchids',
            imageURL: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/140953mmdsv2wc2x.jpg?width=545&height=597&quality=1&auto=webp&optimize={medium}'
        })

        await Plant.create({
            name: 'Harvest Glow™',
            flowerColor: 'yellow',
            flowerType: 'Sunflowers',
            imageURL: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/174303lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}'
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = seed;

if (require.main === module) {
    seed()
      .then(() => {
        console.log(green('Seeding success!'));
        db.close();
      })
      .catch((err) => {
        console.error(red('Oh noes! Something went wrong!'));
        console.error(err);
        db.close();
      });
  }