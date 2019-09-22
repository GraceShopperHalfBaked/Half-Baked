const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productOrder', {
  quantity: {
    type: Sequelize.INTEGER
  },
  totalProductPrice: {
    type: Sequelize.INTEGER
  }
})

module.exports = ProductOrder
