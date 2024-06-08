'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class access_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  access_log.init({
    access_time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'access_log',
  });
  return access_log;
};