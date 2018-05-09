const Sequelize = require('sequelize')
const db = require('../db')

const Thing = db.define('thing', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }, details: {
    type: Sequelize.TEXT
  }
})

module.exports = Thing;
