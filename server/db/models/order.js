const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  cartStatus: {
    // might be worth having a default value of pending
    type: Sequelize.ENUM('pending', 'purchased')
  },
  date: {
    // In my opinion, you don't need this & can use updatedAt
    type: Sequelize.DATE,
    allowNull: false
  },
  totalOrderPrice: {
    // be very careful with this. Floating point numbers in Javascript.
    // hint: using .toFixed is not good enough
    type: Sequelize.FLOAT
  }
})

module.exports = Order
