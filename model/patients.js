const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Patients extends Model {}
Patients.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Patients",
    tableName: "patients",
    timestamps: false,
    name: {
      singular: "Patient",
      plural: "Patients",
    },
  }
);

module.exports = Patients;
