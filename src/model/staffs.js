const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Staffs extends Model {}
Staffs.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Staffs",
    tableName: "staffs",
    timestamps: false,
    name: {
      singular: "Staff",
      plural: "Staffs",
    },
  }
);

module.exports = Staffs;
