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
    res.json(cart.products)
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
      }
    })

    await order[0].addProduct(req.body.id, {
      through: {
        quantity: req.body.cartQuantity,
        totalProductPrice: req.body.cartQuantity * req.body.currentPrice
      }
    })

    let productInfo = {
      ...req.body,
      orderId: order[0].id
    }
    console.log(productInfo)
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

    res.sendStatus(201)
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Order.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
  }
})
