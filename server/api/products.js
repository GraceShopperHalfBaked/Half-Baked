const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//get all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
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
