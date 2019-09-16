const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  cartStatus: {
    type: Sequelize.ENUM('pending', 'purchased')
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  totalCost: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Order
