import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { CreateTableUsers1702113174045 } from "./migration/1702113174045-create-table-users";
import { Users } from "./models/User";
import { Details } from "./models/Details";
import { Activity } from "./models/Activity";
import { Appointment } from "./models/Appointment";
import { Review } from "./models/Review";
import { Bussiness } from "./models/Bussiness";
import { CreateTableDetails1702493556666 } from "./migration/1702493556666-create-table-details";
import { CreateTableActivity1702494395746 } from "./migration/1702494395746-create-table-activity";
import { CreateTableActivityDetails1702494436206 } from "./migration/1702494436206-create-table-activity-details";
import { CreateTableReviews1702494569385 } from "./migration/1702494569385-create-table-reviews";
import { CreateTableAppointments1702494599358 } from "./migration/1702494599358-create-table-appointments";
import { CreateTableBussiness1702494632346 } from "./migration/1702494632346-create-table-bussiness";
import { Activity_Details } from "./models/Activity_Details";




type database = "mysql" | "mariadb"

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as database,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Users, Details, Activity, Activity_Details, Appointment, Review, Bussiness],
  migrations: [CreateTableUsers1702113174045, CreateTableDetails1702493556666, CreateTableActivity1702494395746, CreateTableActivityDetails1702494436206, CreateTableReviews1702494569385, CreateTableAppointments1702494599358, CreateTableBussiness1702494632346],
  synchronize: false,
  logging: false,
});

export { AppDataSource };
