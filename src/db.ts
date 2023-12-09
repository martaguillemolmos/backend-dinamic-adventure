import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { CreateTableUsers1702113174045 } from "./migration/1702113174045-create-table-users";
import { CreateTableActivityDetails1702113272646 } from "./migration/1702113272646-create-table-activity-details";
import { User } from "./models/User";
import { Details } from "./models/Details";
import { CreateTableActivities1702113286550 } from "./migration/1702113286550-create-table-activities";
import { CreateTableReviews1702113309706 } from "./migration/1702113309706-create-table-reviews";



type database = "mysql" | "mariadb"

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as database,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Details],
  migrations: [CreateTableUsers1702113174045, CreateTableActivityDetails1702113272646, CreateTableActivities1702113286550, CreateTableReviews1702113309706],
  synchronize: false,
  logging: false,
});

export { AppDataSource };
