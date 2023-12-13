import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { CreateTableUsers1702113174045 } from "./migration/1702113174045-create-table-users";
import { CreateTableActivityDetails1702113272646 } from "./migration/1702113272646-create-table-details";
import { Users } from "./models/User";
import { Details } from "./models/Details";
import { CreateTableActivities1702113286550 } from "./migration/1702113286550-create-table-activity";
import { CreateTableReviews1702113309706 } from "./migration/1702113309706-create-table-reviews";
import { CreateTableAppointments1702113318143 } from "./migration/1702113318143-create-table-appointments";
import { CreateTableBussiness1702113329740 } from "./migration/1702113329740-create-table-bussiness";
import { Activity } from "./models/Activity";
import { Appointment } from "./models/Appointment";
import { Review } from "./models/Review";
import { Bussiness } from "./models/Bussiness";



type database = "mysql" | "mariadb"

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as database,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Users, Details, Activity, Appointment, Review, Bussiness],
  migrations: [CreateTableUsers1702113174045, CreateTableActivityDetails1702113272646, CreateTableActivities1702113286550, CreateTableReviews1702113309706, CreateTableAppointments1702113318143, CreateTableBussiness1702113329740],
  synchronize: false,
  logging: false,
});

export { AppDataSource };
