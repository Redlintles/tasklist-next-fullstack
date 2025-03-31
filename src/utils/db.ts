import { Sequelize } from "sequelize";
import * as mysql2 from "mysql2";

const connection = new Sequelize(
  process.env.DB_DATABASE || "next_tasklist_api",
  process.env.DB_USERNAME || "root",
  process.env.DB_PASSWORD || "none",
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    dialectModule: mysql2,
  }
);

async function initSequelize() {
  try {
    await connection.authenticate();
    console.log("Conexão Estabelecida");
    await connection.sync({ alter: true });
    console.log("Banco de dados Sincronizado!");
  } catch (error: unknown) {
    console.log(`Erro ao sincronizar o banco de dados ${error}`);
  }
}

initSequelize();
export default connection;
