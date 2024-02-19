// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
(async () => {
  try {
    await sequelize.sync();
    console.log('OTP Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

module.exports = User;
