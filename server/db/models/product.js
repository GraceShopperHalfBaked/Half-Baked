const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    // should be using isEmpty
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://images.clipartlogo.com/files/istock/previews/4066/40662726-bakery-shop.jpg'
  },
  currentPrice: {
    // be careful w/ price
    type: Sequelize.FLOAT, // decimal might be better. use at your own discretion :)
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Product
