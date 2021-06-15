'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsToMany(models.Product, { through: models.CartProduct })
      Cart.belongsTo(models.User)
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'status must be required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
    hooks: {
      beforeCreate: (cart) => {
        cart.status = 'unpaid'
      }
    }
  });
  return Cart;
};