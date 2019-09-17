const router = require('express').Router()
const {Order, ProductOrder, Product} = require('../db/models')

module.exports = router

//create a new order
router.post('/', async (req, res, next) => {
  try {
    const order = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        cartStatus: 'pending'
      },
      defaults: {
        date: Date.now(),
        totalOrderPrice: req.body.product.currentPrice
      }
    })
    await ProductOrder.findOrCreate({
      where: {
        productId: req.body.product.productId,
        orderId: order[0].id
      },
      defaults: {
        quantity: req.body.cartQuantity,
        totalProductPrice: req.body.cartQuantity * req.body.product.currentPrice
      }
    })
    // let productOrder = await ProductOrder.findOne({
    //   where: {
    //     productId: req.body.product.productId,
    //     orderId: order[0].id
    //   }
    // })

    // if (productOrder) {
    //   await ProductOrder.update(
    //     {
    //       quantity: req.body.cartQuantity
    //     },
    //     {
    //       where: {
    //         productId: req.body.product.productId,
    //         orderId: order[0].id
    //       }
    //     }
    //   )
    // } else {
    //   await ProductOrder.create({
    //     productId: req.body.product.productId,
    //     orderId: order[0].id,
    //     quantity: req.body.cartQuantity
    //   })
    // }

    let productInfo = {
      ...req.body.product,
      cartQuantity: req.body.cartQuantity
    }
    res.json(productInfo)
  } catch (err) {
    next(err)
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
