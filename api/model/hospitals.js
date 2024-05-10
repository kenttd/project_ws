const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Hospitals extends Model {}
Hospitals.init(
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Hospitals",
    tableName: "hospitals",
    timestamps: false,
    name: {
      singular: "Hospital",
      plural: "Hospitals",
    },
  }
);

module.exports = Hospitals;
