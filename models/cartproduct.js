'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CartProduct.init({
    CartId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'quantity must be required'
        },
        min: {
          args: 1,
          msg: "quantity can't be negative numbers"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'CartProduct',
    hooks: {
      beforeCreate: (cartProduct) => {
        cartProduct.quantity = 1
      }
    }
  });
  return CartProduct;
};