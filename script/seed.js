'use strict'

const db = require('../server/db')
const {User, Product, Order, ProductOrder} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'NotBatMan@email.com',
      password: '123',
      billingAddress: '123 batcave',
      shippingAddress: '123 batcave'
    }),
    User.create({
      firstName: 'Clark',
      lastName: 'Kent',
      email: 'NotSuperMan@email.com',
      password: '1234',
      billingAddress: '123 batcave',
      shippingAddress: '123 batcave'
    })
  ])

  const orders = await Promise.all([
    Order.create({
      cartStatus: 'pending',
      date: 8 / 4 / 2019,
      totalOrderPrice: 6.5,
      userId: 1
    }),
    Order.create({
      cartStatus: 'purchased',
      date: 9 / 4 / 2019,
      totalOrderPrice: 8.75,
      userId: 2
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Cookies',
      description: 'Perfect to satisfy any cookie craving!',
      imageUrl:
        'https://d2zcsajde7b23y.cloudfront.net/m/3a9fcb374d5bd774e55710e796a5dfacaeee32dd.jpg',
      currentPrice: 1.25,
      quantity: 20
    }),
    Product.create({
      name: 'Cinnamon Spun Roll',
      description:
        'This is how we roll! Our cinnamon spun roll is made from one long thread of yarn and pulls apart into beautiful soft and moist layers. Topped with an Apple Jack frosting and served warm, it is a balance of elegance and just utter sinful deliciousness.  Also the perfect treat in time for sweater weather and a bite of comfort.',
      imageUrl:
        'https://dominiqueanselkitchen.com/wp-content/uploads/2015/11/cinnamonspunroll-1024x1024.jpg',
      currentPrice: 5.25,
      quantity: 20
    }),
    Product.create({
      name: 'Tiramisu',
      description:
        'Coffee-flavoured dessert. It is made of ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese, flavoured with cocoa.',
      imageUrl: 'https://media.timeout.com/images/102769892/750/422/image.jpg',
      currentPrice: 4.25,
      quantity: 20
    }),
    Product.create({
      name: 'EGG-clipse',
      description:
        'a head-spinning blitz of squid-ink brioche, garlicky mashed potatoes, confit egg yolks and a blizzard of Parmesan',
      imageUrl: 'https://media.timeout.com/images/102769893/750/422/image.jpg',
      currentPrice: 7.5,
      quantity: 20
    }),
    Product.create({
      name: 'Dark-chocolate Brownies',
      description: 'yum. Brownies are great description',
      imageUrl: 'https://media.timeout.com/images/103593978/750/422/image.jpg',
      currentPrice: 2.25,
      quantity: 20
    }),
    Product.create({
      name: 'Ultimate Smore',
      description:
        'Our Ultimate Smore is our take on the classic treat, made with speculoos cookies, shards of milk chocolate sprinkled with Maldon sea salt, a dark chocolate ganache with Cabin Fever whiskey, Valrhona Caramelia (caramelized milk chocolate) covered puffed rice, and one big all-honey marshmallow. Torched to perfection, it is almost the size of a burger and decadent in every way.  (nut-free)content/uploads/2015/10/Ultimate-Smore-2-1024x682.jpg',
      currentPrice: 8.75,
      quantity: 20
    })
  ])

  const productOrders = await Promise.all([
    ProductOrder.create({
      totalProductPrice: 5.25,
      quantity: 1,
      orderId: 1,
      productId: 2
    }),
    ProductOrder.create({
      totalProductPrice: 1.25,
      quantity: 1,
      orderId: 1,
      productId: 1
    }),
    ProductOrder.create({
      totalProductPrice: 1.25,
      quantity: 1,
      orderId: 2,
      productId: 1
    }),
    ProductOrder.create({
      totalProductPrice: 7.5,
      quantity: 1,
      orderId: 2,
      productId: 4
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
