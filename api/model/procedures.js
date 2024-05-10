const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Procedures extends Model {}
Procedures.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hospital_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Procedures",
    tableName: "procedures",
    timestamps: false,
    name: {
      singular: "Procedure",
      plural: "Procedures",
    },
  }
);

module.exports = Procedures;
