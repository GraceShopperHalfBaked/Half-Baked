const router = require('express').Router()
const {Order, ProductOrder, Product} = require('../db/models')

module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        cartStatus: 'pending'
      },
      include: [
        {
          model: Product
        }
      ]
    })

    if (cart) {
      res.json(cart)
    } else {
      res.json({
        products: []
      })
    }
  } catch (error) {
    console.error(error)
  }
})

//create a new order
router.post('/', async (req, res, next) => {
  try {
    const order = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        cartStatus: 'pending'
      },
      defaults: {
        date: Date.now()
      }
    })

    console.log('order', order)

    await order[0].addProduct(req.body.id, {
      through: {
        quantity: req.body.cartQuantity,
        totalProductPrice: req.body.cartQuantity * req.body.currentPrice
      }
    })

    let productInfo = {
      ...req.body,
      orderId: order[0].id,
      cartQuantity: req.body.cartQuantity
    }

    res.json(productInfo)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    await ProductOrder.update(
      {
        quantity: req.body.cartQuantity
      },
      {
        where: {
          productId: req.body.id,
          orderId: req.body.orderId
        }
      }
    )

    let productInfo = {
      ...req.body,
      cartQuantity: req.body.cartQuantity
    }

    res.json(productInfo)
  } catch (error) {
    console.error(error)
  }
})

//get a single product
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)

    if (!product) {
      const error = new Error('Product not found! Error from [get]/:productId)')
      error.status = 404
      next(error)
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
})
