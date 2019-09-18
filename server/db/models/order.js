const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  cartStatus: {
    type: Sequelize.ENUM('pending', 'purchased')
  },

  totalOrderPrice: {
    type: Sequelize.FLOAT
  }
})

module.exports = Order
