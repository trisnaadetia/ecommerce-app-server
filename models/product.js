'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Cart, { through: models.CartProduct })
      Product.belongsTo(models.Category)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'product name must be required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'image_url must be required'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        notEmpty: {
          msg: 'price must be required'
        },
        min: {
          args: 1,
          msg: "price can't be negative numbers"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'stock must be required'
        },
        min: {
          args: 1,
          msg: "stock can't be negative numbers"
        },
        isNumeric: {
          msg: 'stock must be format number'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};