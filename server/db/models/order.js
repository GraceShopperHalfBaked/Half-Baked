const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  cartStatus: {
    type: Sequelize.ENUM('pending', 'purchased'),
    defaultValue: 'pending'
  },
  // beware floating ---------revisit
  totalOrderPrice: {
    type: Sequelize.FLOAT
  }
})

module.exports = Order
