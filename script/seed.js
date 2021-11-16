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
  const cody = await User.create({ username: 'cody', password: '123456', email: "cody@test.com" })
  const murphy = await User.create({ username: 'murphy', password: '123456', email: "murphy@test.com" })
  const moe = await User.create({ username: 'moe', password: '123456', isAdmin: true, email: "moe@test.com" })

  const users = [cody, murphy, moe]
  
  //Creating Plants
  const bloomingLove = await Plant.create({
    name: 'Blooming Love™',
    flowerColor: 'red',
    flowerType: 'romance',
    price: 6499,
    stock: 100,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/161132lx.jpg?width=545&height=597&quality=1&auto=webp&optimize={medium}',
    imageUrlsecondary:'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/161132alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Sometimes flowers speak louder than words…and our elegant red roses speak volumes! Beautifully hand-arranged with lush greenery inside our exclusive ruby red vase, each radiant bloom will help you express your love in the most romantic way possible."
  })
  
  const oceanBreezeOrchids = await Plant.create({
    name: 'Ocean Breeze Orchids',
    flowerColor: 'blue',
    flowerType: 'romance',
    price: 6699,
    stock: 80,
    imageUrl: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/140953mmdsv2wc2x.jpg?width=545&height=597&quality=1&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/140953alt_view1x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: 'Like a cool ocean breeze, our tropical Dendrobium orchids deliver a piece of paradise. Each stem is specially color-enhanced in an eye-catching shade of blue, so that each bouquet is truly unique. '
  })
  
  const harvestGlow = await Plant.create({
    name: 'Harvest Glow™',
    flowerColor: 'yellow',
    flowerType: 'get-well',
    price: 4999,
    stock: 40,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/174303lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/174303alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: 'The color and charm of an autumn country harvest inspired our farmhouse-style bouquet. A loose, natural gathering of blooms in vibrant shades of red, orange and yellow creates the perfect complement to our rustic, grey-washed wooden cube. With its soft tones and natural textures, it’s an ideal container for flowers and plants, adding warm and coziness to any fall décor.'
  })

  const dayDream = await Plant.create({
    name: 'Daydream™',
    flowerColor: 'purple',
    flowerType: 'romance',
    price: 4999,
    stock: 40,
    imageUrl: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/179418xlx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/179418alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: 'Just like a daydream. Our delightful lavender bouquet is gathered with pops of pink and lush greenery inside our striking, new fluted violet gathering vase. Designed in vintage pressed glass with ribbed detailing, it captures the rich beauty of the blooms, along with the thoughtfulness of your sentiment.'  
  })

  const roses = await Plant.create({
    name: 'Two Dozen Red Roses™',
    flowerColor: 'red',
    flowerType: 'romance',
    price: 5999,
    stock: 40,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/90926mrdv4ch31x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/91739alt_view1x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: 'Radiant. Timeless. Romantic. There’s something so special about our red roses, especially how loved they’ll feel when a farm-fresh gathering of blooms arrives at their door.'
  })

  const alwaysOnMyMind = await Plant.create({
    name: 'Always On My Mind™',
    flowerColor: 'pink',
    flowerType: 'romance',
    price: 8499,
    stock: 40,
    imageUrl: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/167398xlx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/167398alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: 'When it comes to letting her know she’s always on your mind, think pink and lavender. We’ve hand-gathered a romantic mix of pink and purple blooms to create a gorgeous, garden-inspired bouquet. Designed by expert florist Breanna Cartwright of Modesto, CA, this beautiful bunch will remain a fond memory for a long time.'
  })

  const fieldsOfEurope = await Plant.create({
    name: 'Field Of Europe™',
    flowerColor: 'pink',
    flowerType: 'romance',
    price: 4999,
    stock: 40,
    imageUrl: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/148245xlx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/148245alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: 'Inspired by the rich beauty of the European countryside, our romantic bouquet reveals all the feelings you have in your heart. Fresh-picked pink & red blooms are on display inside a glass vase finished with ribbon, creating a timeless gift for someone you love.'
  })

  const deliciouslyDecadent = await Plant.create({
    name: 'Deliciously Decadent™',
    flowerColor: 'red',
    flowerType: 'romance',
    price: 8999,
    stock: 40,
    imageUrl: 'https://cdn4.fruitbouquets.com/wcsstore/Flowers/images/catalog/192961sbmdsv1x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn4.fruitbouquets.com/wcsstore/Flowers/images/catalog/192961alt_view1x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: 'We’ve brought together classic beauty and sweet indulgence, creating one unforgettable gift. Our red rose bouquet is bundled with one dozen of our signature Gourmet Dipped Fancy Strawberries to make every romantic milestone or everyday “I love you” mean even more.'
  })

  const autumnConfetti = await Plant.create({
    name: 'Autumn Confetti™',
    flowerColor: 'green',
    flowerType: 'get-well',
    price: 4999,
    stock: 40,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/176881lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/176881alt_view1x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: 'Our Autumn Confetti bouquet is a celebration of fall color. Warm orange and yellow blooms are loosely gathered with peach roses for a touch of sweetness. Adding to the charm is our peach quartz mason jar, a textured container designed in a honeycomb pattern and finished with a raffia bow. For cheering on, cheering up or just connecting, it’s a gift full of joy and brightness.'
  })

  const doggieHowser = await Plant.create({
    name: 'Doggie Howser M.D.™',
    flowerColor: 'white',
    flowerType: 'get-well',
    price: 4999,
    stock: 40,
    imageUrl: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/146761x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/146761alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description:"Our doggie doctor provides a sure cure for anyone feeling under the weather. And best of all, he's always willing to make house calls! Part of our signature a-DOG-able® collection, this healing hound has been handcrafted from crisp white carnations, vibrant yellow daisy poms and more. Ready to brighten anyone’s day, he’s the perfect prescription for smiles."
  })

  const floralEmbrace = await Plant.create({
    name: 'Floral Embrace™',
    flowerColor: 'yellow',
    flowerType: 'get-well',
    price: 4999,
    stock: 40,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/167891lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/148522alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Like a warm embrace, our vibrant bouquet delivers your sentiments to someone special. A rich gathering of yellow and orange blooms, with pops of bright pink and purple, it's more than a gift - it's a way to express how you feel inside."
  })

  const goodDay = await Plant.create({
    name: 'Good Day™',
    flowerColor: 'purple',
    flowerType: 'get-well',
    price: 4499,
    stock: 40,
    imageUrl: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/179057x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/179057alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Helping you deliver smiles is what we do…and this feel-good bouquet is a great way to do it! Bunches of blooms in uplifting colors are gathered into our keepsake smiley face container, delivering just the brightness they need to make their day better. Perfect for celebration-worthy moments and everyday sentiments."
  })

  const cureAllKitty = await Plant.create({
    name: 'Cure-All Kitty™',
    flowerColor: 'white',
    flowerType: 'get-well',
    price: 6499,
    stock: 40,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/167683bx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/167683alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Looking for the purr-fect remedy to help them feel better? Our feline M.D. loves to make house calls! This cute, cure-all creation is surrounded by a bright bunch of blooms, and comes with her own doctor’s kit. Add an uplifting balloon to get them on the mend in no time!"
  })
  
  const hangInThere = await Plant.create({
    name: 'Hang in There Rose Plant™',
    flowerColor: 'yellow',
    flowerType: 'get-well',
    price: 4499,
    stock: 40,
    imageUrl: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/101735lckx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/101735alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "If you want to send a unique surprise to someone on the mend, remember that laughter is the best medicine! Our whimsical tin displays a monkey hanging by its tail from a tree and the encouraging sentiment, “Hang in There!” Inside sits a bright, blooming yellow rose plant for an extra pick-me-up. To really make them go bananas, add our cute and cuddly plush Mendin Monkey... and a box of cookies, too!"
  })

  const warmSunset = await Plant.create({
    name: 'Warm Sunset™',
    flowerColor: 'yellow',
    flowerType: 'get-well',
    price: 3999,
    stock: 40,
    imageUrl: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/100589swkv1sfh2x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/87827_altviewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Send someone special a warm sunset to enjoy any time of day. Our bright bouquet of vibrant orange and yellow sunflowers is gathered together to deliver a smile right to their door."
  })

  const cherishedMemories = await Plant.create({
    name: 'Cherished Memories™',
    flowerColor: 'white',
    flowerType: 'sympathy',
    price: 7999,
    stock: 40,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/95379lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/95379alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Memories are timeless treasures of the heart, meant to be cherished. Our striking, all-white sympathy arrangement of roses, snapdragons, alstroemeria and more, elegantly designed by hand in a graceful cylinder vase, is a touching tribute to a life well lived and the memories that will be held dear forever."
  })

  const healingTears = await Plant.create({
    name: 'Healing Tears™',
    flowerColor: 'white',
    flowerType: 'sympathy',
    price: 4999,
    stock: 40,
    imageUrl: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/148683lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/148683alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Soothe their tears as they mourn the loss of a loved one with the serenity of blue and white. Our sympathy arrangement of fresh blue delphinium, white roses and lilies, expertly gathered together in a clear glass cube lined with Ti leaf ribbon, makes for an exquisite gesture of comfort and healing."
  })

  const lovingSentiments = await Plant.create({
    name: 'Loving Sentiments™',
    flowerColor: 'white',
    flowerType: 'sympathy',
    price: 4999,
    stock: 40,
    imageUrl: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/167006lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/167006alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "A loving sentiment can be all it takes to bring comfort during a time of loss. Our bouquet of blissful blue and white blooms will help bring a sense of serenity to a loved one. Hand-designed in a clear cylinder vase, it’s a thoughtful gesture of loving condolence."
  })

  const sincerestSorrow = await Plant.create({
    name: 'Sincerest Sorrow™',
    flowerColor: 'white',
    flowerType: 'sympathy',
    price: 10999,
    stock: 40,
    imageUrl: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/148693lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/148693alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "A sincerity of sentiment means so much to those grieving. Our bountiful, heavenly blue and white bouquet features a soothing mix of blue delphinium, alstroemeria, and white roses, hand-designed inside a classic clear glass vase. When sent to a service or to the home of family or friends, it makes a genuinely heartwarming gesture."
  })

  const whiteBouquetForSympathy = await Plant.create({
    name: 'White Rose & Calla Lily Bouquet',
    flowerColor: 'white',
    flowerType: 'sympathy',
    price: 5999,
    stock: 40,
    imageUrl: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/147703ssmv3x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/95043alt_view1x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Convey your deepest sympathies with our elegant all-white arrangement. One dozen lovely roses are paired with five calla lilies, creating an expression of graceful beauty during this difficult time."
  })

  const beautifulBlooms = await Plant.create({
    name: 'Beautiful Blooms™',
    flowerColor: 'white',
    flowerType: 'sympathy',
    price: 5499,
    stock: 40,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/159132sv2sc2120418x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/84208_hg_sc2_suncatcherx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Convey your deepest sympathies with our elegant mixed arrangement. Pure white roses, Peruvian lilies, and poms are accented with stock or snapdragon and eucalyptus, to create an expression of graceful beauty that will lend comfort during a difficult time."
  })

  const cherishedGarden = await Plant.create({
    name: 'Cherished Garden™',
    flowerColor: 'white',
    flowerType: 'sympathy',
    price: 4999,
    stock: 40,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/179097lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/156138alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "One thoughtful gesture can bring cherished memories of a loved one flooding back. Our country-inspired bouquet is gathered with soothing, pearl-white blooms in a loose, natural style. Complementing the arrangement is our grey-washed wooden cube, featuring soft tones and natural textures that add to the warmth and comfort of your sentiment."
  })

  const buddingRose = await Plant.create({
    name: 'Classic Budding Rose™',
    flowerColor: 'pink',
    flowerType: 'plant',
    price: 6799,
    stock: 40,
    imageUrl: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/101980lyspx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/rosealt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Our pink rose plant is a true classic. Designed in a rose-patterned planter with an elegant gold scalloped rim, it brings timeless beauty to the home or garden. Complement your gift by adding our rose-scented Yankee Candle® on its own or bundled with soothing hand lotion from Camille Beckman® in a signature floral fragrance."
  })

  const pickOfThePatch = await Plant.create({
    name: 'Pick of The Patch Mum™',
    flowerColor: 'orange',
    flowerType: 'plant',
    price: 6799,
    stock: 40,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/158154lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/158154alt_view3x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "A fall favorite, our lush blooming mum is sure to delight. Vibrant orange blooms arrive designed in our rustic, farm stand-inspired planter to complete its seasonal charm."
  })

  const gatherTogether = await Plant.create({
    name: 'Gather Together Gardenia™',
    flowerColor: 'white',
    flowerType: 'plant',
    price: 5499,
    stock: 40,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/158158lkx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/158158alt_view2x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Our signature gardenia plant arrives budding and ready to bloom with fragrant white flowers. Designed in our textured canvas, pumpkin-themed planter, it’s a beautiful part of every fall gathering. Add a special touch to your gift with our keepsake “Gather Together” wooden sign."
  })

  const bloomDish = await Plant.create({
    name: 'Bloom Dish Garden™',
    flowerColor: 'yellow',
    flowerType: 'plant',
    price: 4999,
    stock: 40,
    imageUrl: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/18650hbdx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/18650alt_view1x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "All the beauty of an outdoor garden, right inside. Our dish garden brings together lush green foliage with a bright blooming plant for a pop of color. Arriving in a charming, window box-style wooden container with handles and stencil-cut ‘BLOOM’ design, it’s a delightful any-day pick-me-up. Add your choice of balloon for a cheerful surprise."
  })

  const azaleaBonsai = await Plant.create({
    name: 'Azalea Bonsai™',
    flowerColor: 'pink',
    flowerType: 'plant',
    price: 4499,
    stock: 40,
    imageUrl: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/18201lwx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/18201alt_view2x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Here’s a unique and beautiful gift for someone who’s one-of-a-kind! Grown in Japan for centuries, our Satsuki Azalea bonsai blooms later in the spring, producing an abundance of bright pink blossoms. Even when it’s not in bloom, the tree’s glossy green leaves keep it looking gorgeous all year long to delight your special recipient."
  })

  const sophisticatedLily = await Plant.create({
    name: 'Sophisticated White Calla Lily™',
    flowerColor: 'white',
    flowerType: 'plant',
    price: 4699,
    stock: 40,
    imageUrl: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/101199lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/101198_calla_lily_1_altx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "The classic beauty of our white Calla lily plant, with its elegant, sculpted ivory blooms and expressive green leaves, creates a striking combination of color and texture when paired with our sleek black ceramic planter. Whether sent as a gift or displayed in your own home, this stylish plant is sure to transform any space. "
  })

  const sweetHeartBamboo = await Plant.create({
    name: 'Sweet Heart Bamboo™',
    flowerColor: 'green',
    flowerType: 'plant',
    price: 3999,
    stock: 40,
    imageUrl: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/18999ln2x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/18999alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "When it comes to gifts, this one’s a keeper. Our fresh bamboo is known for bringing extra luck and good fortune. Expertly shaped into a single, double or triple heart, this favorite is designed in a glass planter with decorative stones to leave an impression on your sweetheart."
  })

  const grandGardenia = await Plant.create({
    name: 'Grand Gardenia™',
    flowerColor: 'white',
    flowerType: 'plant',
    price: 4699,
    stock: 40,
    imageUrl: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/18053xlcx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn2.1800flowers.com/wcsstore/Flowers/images/catalog/gardeniaalt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "With its graceful, fragrant blooms and glossy green leaves, our gardenia is a favorite among plant lovers. Available in three sizes, it arrives budding in our antique-inspired planter. Make your gesture even more grand by adding our gardenia-scented Yankee Candle®."
  })

  const bonfireWarmthOrchid = await Plant.create({
    name: 'Bonfire Warmth Orchid™',
    flowerColor: 'orange',
    flowerType: 'plant',
    price: 9499,
    stock: 40,
    imageUrl: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/157982l4x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/157982alt_1x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Like the glow of an evening bonfire, our new orchid has an undeniable beauty. Created exclusively through our partnership with Just Add Ice®, this elegant plant displays cascading blooms in shades of orange, along with spiraling gold accents. Available in two sizes, it’s designed in our hammered copper planter, for a gift with truly unique style."
  })

  const herbGardenTrio = await Plant.create({
    name: 'Herb Garden Trio™',
    flowerColor: 'green',
    flowerType: 'plant',
    price: 3999,
    stock: 40,
    imageUrl: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/157209lnx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/157209alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Our unique 3-in-1 herb gift was designed with gardening enthusiasts and foodies in mind. A trio of oregano, parsley and thyme arrive inside our keepsake wooden “Fresh Herbs” planter with the quaint charm of a farmer’s market stand. Give them a head start on food prep by adding our handy herb scissors, the perfect tool for clipping and cooking."
  })

  const elegantCallaLily = await Plant.create({
    name: 'Elegant Calla Lily',
    flowerColor: 'purple',
    flowerType: 'plant',
    price: 4499,
    stock: 40,
    imageUrl: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/18747kpskx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/18747alt_view2x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Bursting with vibrant purple blooms, our fresh Calla lily plant paints a picture of elegance, designed in a grey-washed wood planter. For a thoughtful surprise, add our keepsake sentiment plaque to their gift."
  })

  const cactusDishGarden = await Plant.create({
    name: 'Cactus Dish Garden',
    flowerColor: 'green',
    flowerType: 'plant',
    price: 5499,
    stock: 40,
    imageUrl: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/1830lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/supplied_alt_2_stushigalstylex.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Bring a touch of Southwestern charm to any home décor with our easy-to-care-for cactus dish garden. A collection of assorted cacti and succulents come together in a charming Pueblo-design pot, creating a unique desert gardenscape alive with eye-catching texture and color. It’s a trendy gift that’s sure to ‘prickle’ their fancy!"
  })

  const birdsOfParadise = await Plant.create({
    name: 'Birds of Paradise™',
    flowerColor: 'green',
    flowerType: 'plant',
    price: 9999,
    stock: 40,
    imageUrl: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/158107llx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/158107alt_view1x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Create an at-home oasis with our Bird of Paradise floor plant. This tropical frond features long, glossy, banana-like leaves to make a statement in any space. A neutral-toned planter adds to its versatile style."
  })

  const snakeFloor = await Plant.create({
    name: 'Snake Floor Plant (Sansevieria)',
    flowerColor: 'green',
    flowerType: 'plant',
    price: 8999,
    stock: 40,
    imageUrl: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/157624lgx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn1.1800flowers.com/wcsstore/Flowers/images/catalog/157624alt_view_lx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "With its stiff, upright growth, our Snake Plant is downright architectural in its beauty. Featuring glossy, emerald-green leaves with light green horizontal striations, it’s not only statement-making, but extremely neglect tolerant. Win-win! Available with your choice of planter."
  })

  const ultimateElegance = await Plant.create({
    name: 'Ultimate Elegance™',
    flowerColor: 'red',
    flowerType: 'romance',
    price: 12999,
    stock: 40,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/161777l010918x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/redroses_altx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Our luxurious long stem red roses are the ultimate surprise to say “I love you.” Four dozen radiant blooms are artistically arranged by our expert florists inside an elegant glass vase and personally hand-delivered to help you say how you feel in a truly romantic way."
  })

  const lovePup = await Plant.create({
    name: 'Love Pup™',
    flowerColor: 'white',
    flowerType: 'romance',
    price: 5999,
    stock: 40,
    imageUrl: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/179409x.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    imageUrlsecondary: 'https://cdn3.1800flowers.com/wcsstore/Flowers/images/catalog/179409alt_viewx.jpg?width=545&height=597&quality=80&auto=webp&optimize={medium}',
    description: "Talk about puppy love! Crafted from lasting white carnations, our canine cutie is sitting pretty in a dog bed basket, surrounded by a mix of red and pink blooms. The perfect pick to spark romance or celebrate a special relationship."
  })

  const plants = [bloomingLove, oceanBreezeOrchids, harvestGlow]
  
  //Adding items to cart
  const order1 = await Order.findByPk(1)
  const association1 = await order1.addPlants(1, {through: {price: 7000}})
  const association4 = await order1.addPlants(3, {through: {price: 2000}})
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
