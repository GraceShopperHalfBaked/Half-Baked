const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productOrder', {
  quantity: {
    type: Sequelize.INTEGER
  },
  totalProductPrice: {
    type: Sequelize.DECIMAL(12, 2)
  }
})

module.exports = ProductOrder
