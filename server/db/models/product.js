const Sequelize = require('sequelize')
const db = require('../db')

//isempty - allownull --revisit
// beware floating ---------revisit
const Product = db.define('product', {
  name: {
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
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Product
