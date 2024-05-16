const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class AccessLog extends Model {}
AccessLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    access_time: {
      type: DataTypes.TIME,
    },
    api_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endpoint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AccessLog",
    tableName: "access_log",
    timestamps: false,
    name: {
      singular: "AccessLog",
      plural: "AccessLogs",
    },
  }
);

module.exports = AccessLog;
