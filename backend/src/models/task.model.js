const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

class Task extends Model {}

Task.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("pendente", "em progresso", "concluída"),
      allowNull: false,
      defaultValue: "em progresso",
    },
    createdAt: { type: DataTypes.DATE, field: "created_at" },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Task;
