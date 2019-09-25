const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  cartStatus: {
    type: Sequelize.ENUM('pending', 'purchased'),
    defaultValue: 'pending'
  },
  totalOrderPrice: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
