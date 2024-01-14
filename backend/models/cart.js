const Sequilize = require("sequelize");

const sequelize = require("../utils/database");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
