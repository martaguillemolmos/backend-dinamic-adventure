import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { CreateTableUsers1702113174045 } from "./migration/1702113174045-create-table-users";



type database = "mysql" | "mariadb"

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as database,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [],
  migrations: [CreateTableUsers1702113174045],
  synchronize: false,
  logging: false,
});

export { AppDataSource };
