import { DataTypes } from "sequelize";
import connection from "@/utils/db";

const Task = connection.define("Task", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Task;
