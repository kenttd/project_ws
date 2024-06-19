'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class procedure_appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  procedure_appointment.init({
    appointment_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'procedure_appointment',
  });
  return procedure_appointment;
};