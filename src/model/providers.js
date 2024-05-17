const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Providers extends Model {}
Providers.init(
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
    modelName: "Providers",
    tableName: "providers",
    timestamps: false,
    name: {
      singular: "Provider",
      plural: "Providers",
    },
  }
);

module.exports = Providers;
