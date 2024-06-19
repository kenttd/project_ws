const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class procedure_appointment extends Model {}
procedure_appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    procedure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "procedureAppointment",
    tableName: "procedure_appointment",
    timestamps: false,
    name: {
      singular: "procedure_appointment",
      plural: "procedure_appointment",
    },
  }
);

module.exports = procedure_appointment;
