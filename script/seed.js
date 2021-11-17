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
  const theFallCenterpiece = await Plant.create({
    name: 'The Fall Centerpiece',
    flowerColor: 'yellow',
    flowerType: 'thanksgiving',
    price: 8799,
    stock: 100,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Fall%202021/Seasonal%20Bloom/Fall%20Centerpiece%20New/FallCenterpiece_Carousel.jpg',
    imageUrlsecondary:'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Fall%202021/Seasonal%20Bloom/Fall%20Centerpiece%20New/SeasonalBloom_Top.jpg',
    description: "Vibrant colors alone make The Fall Centerpiece worthy of a spot on any tablescape this season. The aptly named bouquet is a true autumnal celebration, packed with juicy oranges, sunny yellows, and warm rust tones. Sunflowers command attention, while lush accents bring texture and style to the arrangement. It’s nestled in a shapely black vessel pot that you’ll use long after the flowers are gone."
  })
  
  const theMorello = await Plant.create({
    name: 'The Morello',
    flowerColor: 'purple',
    flowerType: 'bestSeller',
    price: 7499,
    stock: 80,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Morello/New/Morello_Carousel_New.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Morello/New/Morello_Top_New.jpg',
    description: 'Deep and enigmatic cherry is almost hypnotic in its beauty. It also lends inherent sophistication to the Morello, our lush combination of vivid scabiosa and ranunculus thoughtfully arranged with fresh greenery for a touch of contrast. As attention-grabbing as the rich, cherry hue for which it’s named, our show-stopping arrangement is at once lush, romantic, and brimming with character.'
  })
  
  const theLola = await Plant.create({
    name: 'The Lola™',
    flowerColor: 'pink',
    flowerType: 'bestSeller',
    price: 4999,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/the-lola/Lola_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/the-lola/Lola_Top.jpg',
    description: 'With an exotic look of freckled pink petals, these rose lilies are known for their exquisite color and sweet scent. While some of these fragrant blooms may arrive in bud form, rest assured they’ll unfurl into a dazzling display of pink color.'
  })

  const theCatalina = await Plant.create({
    name: 'The Catalina',
    flowerColor: 'red',
    flowerType: 'bestSeller',
    price: 5799,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Summer21/Catalina/Catalina_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Summer21/Catalina/Catalina_Top.jpg',
    description: 'Radiant jewel tones capture the wonder and beauty of The Catalina. This uplifting bouquet is a special choice for a summertime bride, featuring eye-catching queen protea stems accented by smokebush and eucalyptus. The effect is at once cheerful and dramatic, and always festive and bright. Whether you’re walking down the aisle or decorating the home, you’ll find it instantly elevates any room with its array of rich hues.'  
  })

  const theJuliet = await Plant.create({
    name: 'The Juliet',
    flowerColor: 'red',
    flowerType: 'bestSeller',
    price: 6799,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Valentines%202020/The%20Juliet/Juliet_3Stems_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Valentines%202020/The%20Juliet/Juliet_3Stems_Top.jpg',
    description: 'As bright, fresh, and vibrant as Juliet’s love, this arrangement features lush delphinium, striking lisianthus, stunning free spirit roses, and starry asters. The varying sizes of the different flowers and the staggering heights of the greenery and blooms show individuality and uniqueness, just like your one-of-a-kind relationship. Capture the essence of boundless love and the fresh hope of springtime with this airy arrangement.'
  })

  const theSonny = await Plant.create({
    name: 'The Sonny',
    flowerColor: 'yellow',
    flowerType: 'bestSeller',
    price: 4499,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Sonny/Sonny_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Sonny/Sonny_top.jpg',
    description: 'Sunshine days are easy to find when you’ve got The Sonny on your side. This eye-catching sunflower arrangement will add a hefty dose of good cheer anywhere it goes. Perfect for celebrating new beginnings, brightening up a birthday, or simply warming up any area of the home, this vibrant bouquet is naturally associated with joy, fun, and happiness.'
  })

  const theCrispin = await Plant.create({
    name: 'The Crispin',
    flowerColor: 'red',
    flowerType: 'bestSeller',
    price: 7499,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Crispen/Crispen_Carousel_v2.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Crispen/Crispen_Top.jpg',
    description: 'An undeniable symbol of optimism, joy, and general goodness, the chrysanthemum is the type of flower that needs no real introduction. In the Crispin, this forever favorite plays a starring role. Deep, autumnal hues of burgundy, peach, red, and apricot bring this creative arrangement to life. What better way to ring in the season than with an explosion of brilliant color?'
  })

  const theJardin = await Plant.create({
    name: 'The Jardin',
    flowerColor: 'purple',
    flowerType: 'bestSeller',
    price: 5499,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Summer21/Jardin/Jardin_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Summer21/Jardin/Jardin_Top.jpg',
    description: 'As fresh and carefree as the stunning European gardens you dream of visiting, The Jardin flourishes with exuberant wildflowers in a rainbow of sweetly seasonal hues. Lush greenery completes the look and adds the perfect contrast to the mix. At once exotic and elegant, this bouquet bursts with fresh colors ranging from cool shades to pastel tones.'
  })

  const theManor = await Plant.create({
    name: 'The Manor',
    flowerColor: 'white',
    flowerType: 'bestSeller',
    price: 6799,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Manor/Manor_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Manor/Manor_Top.jpg',
    description: 'The Manor is so sweet, it’s enough to make anyone blush! With its medley of soft pinks and ivories mingling alongside fresh greenery, it’s a charming arrangement perfect for adding just a hint of color to any space. It’s the perfect surprise for a birthday, an anniversary, a special occasion, or just because you want to make their day.'
  })

  const theLuna = await Plant.create({
    name: 'The Luna',
    flowerColor: 'purple',
    flowerType: 'bestSeller',
    price: 6799,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/The%20Luna/Luna_5437.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/The%20Luna/Luna_TopDown_5441.jpg',
    description:"The bohemian spirit and undeniable beauty of The Luna are hard to resist. Hints of blue, coupled with ivory and lavender, make it a harmonious choice that is both calming and balancing. It’s the obvious choice for adding some soft sweetness and tranquility to your space."
  })

  const theConfetti = await Plant.create({
    name: 'The Confetti',
    flowerColor: 'yellow',
    flowerType: 'bestSeller',
    price: 6799,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Spring21/Confetti/Confetti_Carousel_V2.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Spring21/Confetti/Confetti_Top.jpg',
    description: "A carnival of color and texture, this arrangement is like cotton candy dipped in rainbow sprinkles wrapped in a giant velvet bow. If we could shoot it out of a cannon we would! Instead, they will lovingly be hand-delivered to the doorstep of your choosing. In celebration of Pride, UrbanStems has pledged a donation of $10,000 to The Trevor Project, the world's largest suicide prevention and crisis intervention organization for LGBTQ young people."
  })

  const thePrism = await Plant.create({
    name: 'The Prism',
    flowerColor: 'yellow',
    flowerType: 'bestSeller',
    price: 8499,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/the-prism/Prism%20New%20Carnations/Prism_New_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/the-prism/Prism%20New%20Carnations/Prism_New_Top.jpg',
    description: "Show your pride -- and celebrate with a rainbow of gorgeous hues. The Prism reflects joy, light, passion, and purer fun with its palette of rich purples, vivid yellows, fresh greens, and enigmatic reds. They all vie for the spotlight, creating a spectrum of eye-catching shades. In celebration of Pride, UrbanStems has pledged a donation of $10,000 to The Trevor Project, the world's largest suicide prevention and crisis intervention organization for LGBTQ young people."
  })

  const theSeasonalBloom = await Plant.create({
    name: 'The Seasonal Bloom',
    flowerColor: 'yellow',
    flowerType: 'bestSeller',
    price: 6999,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Fall%202021/Seasonal%20Bloom/Seasonal%20Bloom%20New/SeasonalBloom_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Fall%202021/SeasonalBloom_Top_New.jpg',
    description: "The season of frothy lattes, spice tones, and multicolored leaves calls for a celebratory floral arrangement. Enter The Seasonal Bloom, featuring a medley of rich textures and an even more stunning array of dramatic shades. Oranges, blushes, and mustards? Oh, my! It’s just the thing for your autumnal tablescapes or for ushering in the cooler weather with a touch of warmth."
  })
  
  const theEden = await Plant.create({
    name: 'The Eden',
    flowerColor: 'pink',
    flowerType: 'bestSeller',
    price: 5499,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Holiday%202021/Eden/Eden_Carousel_New.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Holiday%202021/Eden/Eden_Top_New.jpg',
    description: "Wildflowers have never looked so good. The Eden features some of the most underrated stems— think spray roses, mums, and dianthus, to name a few. Together, they unite to form an exquisite bouquet that looks as though it was picked straight from the garden. Full of personality, it’s the perfect finishing touch for any special occasion."
  })

  const thePinkChampagne = await Plant.create({
    name: 'The Pink Champagne',
    flowerColor: 'pink',
    flowerType: 'bestSeller',
    price: 6499,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Holiday%202021/PinkChampagne_Carousel_new.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Fall%202021/Pink%20Champagne/PinkChampagne_Top.jpg',
    description: "Lively and effervescent, The Pink Champagne bouquet is best suited for a celebration. With blush-toned roses and towering pink scabiosa, this bouquet manages to capture pink’s genuine and timeless allure."
  })

  const thePeony = await Plant.create({
    name: 'The Peony',
    flowerColor: 'pink',
    flowerType: 'bestSeller',
    price: 8499,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Daydream/Daydream_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Daydream/Daydream_Top%20copy.jpg',
    description: "Lush and full of life, it's not every day that you'll come across these pillowy stems. This striking blush-toned bouquet is a welcome addition to any room. Peonies have become symbolic with prosperity, making this a fitting gift for anything from congratulations to housewarmings. This peony arrangement may arrive in bud form but will unfurl into the pillowy stem we all love. Read more about the meaning of the pale pink peony. Choose from two bouquet sizes of lush peonies, a 10-stem Single, or a 20-stem Double."
  })

  const theSunburst = await Plant.create({
    name: 'The Sunburst',
    flowerColor: 'pink',
    flowerType: 'bestSeller',
    price: 8499,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Spring21/Sunburst/Sunburst_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Spring21/Sunburst/Sunburst_Top.jpg',
    description: "Bring a heavy dose of bright color into the home with The Sunburst. This peony arrangement may arrive in bud form, but will unfurl into the pillowy stem we all love. The stem's golden center and vibrant hue is the surest way to brighten someone's day. To ensure you get the freshest peonies delivered, the color of The Sunburst may vary from hot pink to light pink to red. Regardless of its fiery hue, this arrangement is sure to shine. Choose from two bouquet sizes of lush peonies, a 10-stem Single, or a 20-stem Double."
  })

  const thePearl = await Plant.create({
    name: 'The Pearl',
    flowerColor: 'white',
    flowerType: 'bestSeller',
    price: 8499,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Pearl/Pearl/Pearl_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Pearl/Pearl/Pearl_Top.jpg',
    description: "Add warmth and purity to any space courtesy of the blissful and aptly named Pearl bouquet. Featuring lush white peonies, each with a delicate pink center, the arrangement is a special treat for the warmer months. They arrive in compact bulb form, eventually thriving and developing into the pillow-like blooms. Read more about the meaning of the white peony. Choose from two bouquet sizes of lush peonies, a 10-stem Single, or a 20-stem Double."
  })

  const theUnicorn = await Plant.create({
    name: 'The Unicorn',
    flowerColor: 'white',
    flowerType: 'bestSeller',
    price: 5499,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/the-unicorn/Unicorn_Carousel%20(1).jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/the-unicorn/Unicorn_Top%20(1).jpg',
    description: "A vibrant mix of purple, lilac and pink blossoms. The feminine color palette is pretty without being overtly sweet, much like the rare and magical creature it is named after. Add a touch of purple this season with a mix of lavender-hued roses and sprigs of aster."
  })

  const theVerona = await Plant.create({
    name: 'The Verona',
    flowerColor: 'red',
    flowerType: 'bestSeller',
    price: 6799,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/New%20Doubles%20and%20Triples/The%20Verona/Verona_Carousel.jpeg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/New%20Doubles%20and%20Triples/The%20Verona/Verona_Top.jpeg',
    description: "Named after the town where Shakespeare’s infamous Romeo and Juliet takes place, The Verona is a picturesque arrangement featuring lush roses and delicate spray roses, accented with hypericum berries. This enchanting and sophisticated beauty makes it an unforgettable gift for the one you cherish – whether they're a friend or romantic loved one."
  })

  const theMacchiato = await Plant.create({
    name: 'The Macchiato',
    flowerColor: 'red',
    flowerType: 'thanksgiving',
    price: 5199,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Machiatto%202020/Machiatto_v2_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Machiatto%202020/Machiatto_New_Top_V2.jpg',
    description: "The aromatic sprigs of lavender and vibrant terracotta roses are sure to perk anyone up this fall. Thanks to The Macchiato’s warm tones and velvet leaves, this bouquet is sure to become an autumnal staple."
  })

  const theMangolia = await Plant.create({
    name: 'The Mangolia',
    flowerColor: 'white',
    flowerType: 'thanksgiving',
    price: 8999,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Magnolia/Magnolia/Magnolia_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Magnolia/Magnolia/Magnolia_Top.jpg',
    description: "Leaves that look frosted and pure white petals conjure up one of our favorite days of the holiday season: the first snowfall. This monochromatic bouquet filled with magnolia leaves and fluffy mums pairs nicely with a fluffy blanket and a decadent cup of hot cocoa."
  })

  const theMauve = await Plant.create({
    name: 'The Mauve',
    flowerColor: 'purple',
    flowerType: 'thanksgiving',
    price: 10999,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Fall%202021/Mauve/Mauve_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Fall%202021/Mauve/Mauve_Top.jpg',
    description: "The sheer sophistication of it all! The Mauve is an elaborate arrangement that needs no introduction. Like the royal beauty that it is, it commands attention with a combination of chrysanthemums, snapdragons, and ranunculus. The rich, vibrant shades of purple range from violet to eggplant, lending the bouquet an elegant appearance perfect for welcoming fall."
  })

  const theAutumnGarden = await Plant.create({
    name: 'The Autumn Garden',
    flowerColor: 'orange',
    flowerType: 'thanksgiving',
    price: 12999,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Fall%202021/Autumn%20Garden/Autumn_Garden_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Fall%202021/Autumn%20Garden/AutumnGarden_Top.jpg',
    description: "A feast for the senses, The Autumn Garden is a visual celebration of the season’s very best. What’s most spectacular? Take in the vibrant pops of apricot, the eye-catching berries, and the rich cranberry tones, all of which enjoy their turn to shine. Mingling with lush greenery, the stems represent the very best of fall."
  })

  const theManhattan = await Plant.create({
    name: 'The Manhattan',
    flowerColor: 'purple',
    flowerType: 'thanksgiving',
    price: 14999,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Spring21/Miss%20Manhattan/MissManhattan_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Spring21/Miss%20Manhattan/Miss%20Manhattan/MissManhattan_Top2.jpg',
    description: "As the name suggests, this romantic bouquet was inspired by a city's sleek architecture and natural beauty. The Manhattan truly shines with a stunning array of calla lilies, sprigs of snapdragons, and a plethora of roses."
  })

  const theCrimson = await Plant.create({
    name: 'The Crimson',
    flowerColor: 'red',
    flowerType: 'thanksgiving',
    price: 12999,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Fall%202021/Crimson/Crimson/Crimson_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Fall%202021/Crimson/Crimson/Crimson_Top.jpg',
    description: "The surest sign of autumn has arrived. The Crimson captures the spirit of the season perfectly, with its array of magnificent red roses and pops of mustard and green tones. It’s a medley that brims with sleek sophistication."
  })

  const theBriar = await Plant.create({
    name: 'The Briar',
    flowerColor: 'red',
    flowerType: 'thanksgiving',
    price: 10999,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Fall%202021/Briar/Briar_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Fall%202021/Briar/Briar_Top.jpg',
    description: "Brimming with sophistication, The Briar features a creative array of roses, scabiosa, and astilbe. From the pale and the dark to the light and the rich, it’s the study in contrasts that stands out here. This moody bouquet adds to the elegance of any room."
  })

  const theButtercream = await Plant.create({
    name: 'The Buttercream',
    flowerColor: 'white',
    flowerType: 'plant',
    price: 6499,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/The%20Buttercream/Buttercream_New_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/The%20Buttercream/Buttercream_New_Top.jpg',
    description: "The Buttercream bouquet is what sweet dreams of made of. We whipped up delicate lisianthus and a variety of vanilla roses to create the ultimate monochromatic look. Sprinkled with a few snapdragons throughout, The Buttercream is fit for any celebration. And the sprigs of fluffy stock? Well, that’s just the icing on the cake."
  })

  const theCarnivale = await Plant.create({
    name: 'The Carnivale',
    flowerColor: 'orange',
    flowerType: 'plant',
    price: 7499,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/the-carnivale/Carnivale_New_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/the-carnivale/Carnivale_New_Top.jpg',
    description: "A dazzling display of hues and blooms, The Carnivale is a guaranteed main attraction for any event. This festive arrangement includes a pink Cotton Candy rose, pops of towering pink snapdragons, and bright orange blooms fit for any celebration."
  })

  const theAmethyst = await Plant.create({
    name: 'The Amethyst',
    flowerColor: 'pink',
    flowerType: 'plant',
    price: 9799,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/the-amethyst/Amethyst_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/the-amethyst/Amethyst_Top.jpg',
    description: "This jewel-toned bouquet includes some of our most coveted flowers (think fluffy mums and crimson safari sunsets). Named after the alluring gemstone with stress-relieving properties, we like to think this enchanting bouquet may have a similar effect. Send this arrangement to your loved ones and they'll be transfixed by this dazzling display of blooms."
  })

  const theYork = await Plant.create({
    name: 'The York',
    flowerColor: 'purple',
    flowerType: 'plant',
    price: 6999,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Holiday%202021/York/York_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Holiday%202021/York/York_Top.jpg',
    description: "This generous bouquet of pillowy purple and white garden roses, hints of purple veronicas, and fragrant eucalyptus is a feast for the eyes and the heart. Its bold contrast of dark and light colors draws attention and adds a level of gravitas to your gift. If you love to give the unexpected, you'll also love the bold curves of The York's delphinium and snapdragons that make this arrangement truly pop with personality."
  })

  const theRemi = await Plant.create({
    name: 'The Remi',
    flowerColor: 'white',
    flowerType: 'plant',
    price: 10999,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Holiday%202021/Remy/Remy/Remi_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Holiday%202021/Remy/Remy/Remy_Top.jpg',
    description: "Until November: The Remi, a beautiful bouquet of peonies and Queen Anne's lace, is made to soothe the heart. The peony embodies both luxury and modesty with its plentiful petals and iconic shy droop. Combine this with the intricate texture of Queen Anne's lace, and you have a regal bouquet for a variety of celebrations. November to February: The Remi, a stunning bouquet of peonies and Queen Anne's lace, is made to soothe the heart. This beautiful arrangement of plush garden roses and delicate Queen Anne's lace craft a soft scene that is perfect for romance or commemorating special events. Make your gift complete with some add-on chocolates and a personal message from your heart."
  })

  const theFinesse = await Plant.create({
    name: 'The Finesse',
    flowerColor: 'pink',
    flowerType: 'plant',
    price: 7999,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/the-alice-2018/Alice_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/the-alice-2018/Alice_Top.jpg',
    description: "Designed with a romantic arrangement of sweet roses, delicate ranunculus, and fragrant dianthus, The Finesse is a bouquet that will enchant and delight. Its unique color construction is anything but ordinary. Soft pretty pinks with a hint of lavender undertones alongside peach and apricot shades are offset by brighter pink blooms. Classic yet modern, this arrangement channels the romance of traditional roses into a fresh, original look."
  })

  const theLucy = await Plant.create({
    name: 'The Lucy',
    flowerColor: 'yellow',
    flowerType: 'plant',
    price: 4999,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Spring21/Gloria%20-%20Bumble/Bumble_2__Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Spring21/Gloria%20-%20Bumble/Bumble_2_Top.jpg',
    description: "The Lucy is a sunny floral arrangement that puts bright yellows on full display against a backdrop of bright green foliage. Playful daises are paired with whimsy snapdragons, mini carnations, and textured ruscus, making The Lucy the perfect gift for pick-me-ups."
  })

  const theMurano = await Plant.create({
    name: 'The Murano',
    flowerColor: 'white',
    flowerType: 'plant',
    price: 5999,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/the-murano/Murano_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/the-murano/Murano_Top.jpg',
    description: "This towering white orchid comes potted in a patterned blue and white pot that resembles the artistic glass one may find in the Italian city of Murano. Place on a kitchen counter or in an office for a chic look that’s nothing short of bellissima."
  })

  const theGlitz = await Plant.create({
    name: 'The Glitz',
    flowerColor: 'white',
    flowerType: 'plant',
    price: 6499,
    stock: 40,
    imageUrl: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Holiday%202021/Glitz/Glitz_Carousel.jpg',
    imageUrlsecondary: 'https://media.urbanstems.com/image/upload/f_auto/w_900,c_fit,q_80/Catalogs/urbanstems-master/Holiday%202021/Glitz/Glitz_Top_.jpg',
    description: "Did someone say glamorous? The Glitz brings all the bling to the party! This gorgeous accent is the stuff of floral fantasies. It’s got everything going for it, from its exquisite white orchid—a plant that is fittingly symbolic of both elegance and purity—to its absolutely dazzling gilded vase. It shines from every angle thanks to its sparkling finish. This gleaming accessory is perfect to give as a housewarming gift, a birthday surprise, a thank you, or a personal treat."
  })


  // const plants = [bloomingLove, oceanBreezeOrchids, harvestGlow]
  
  //Adding items to cart
  // const order1 = await Order.findByPk(1)
  // const association1 = await order1.addPlants(1, {through: {price: 7000}})
  // const association4 = await order1.addPlants(3, {through: {price: 2000}})
  // const order2 = await Order.findByPk(2)
  // const association2 = await order2.addPlants(2, {through: {price: 2500}})
  // const order3 = await Order.findByPk(3)
  // const association3 = await order3.addPlants(3, {through: {price: 2000}})

  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded ${plants.length} plants`)
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
