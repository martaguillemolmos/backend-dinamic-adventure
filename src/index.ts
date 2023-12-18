import express from "express";
import cors from "cors";
import 'dotenv/config'

import { router as routerUser } from "./routes/usersRoutes";
import { router as routerActivity } from "./routes/activitiesRoutes";
import { router as routerDetails } from "./routes/detailRoutes";
import { router as routerAppointment } from "./routes/appointmentsRoutes";
import { router as routerReview } from "./routes/reviewsRoutes";
import { router as routerBussiness } from "./routes/bussinessRoutes";
import { router as routerActivity_Details } from "./routes/activity_detailsRoutes";

import { AppDataSource } from "./db";
const PORT = process.env.PORT || 4000;

const app = express ();
app.use (express.json({limit: '50mb'}));
app.use (cors());

app.use ('/user', routerUser);
app.use ('/activity', routerActivity);
app.use ('/details', routerDetails);
app.use ('/activity_details', routerActivity_Details);
app.use ('/appointment', routerAppointment);
app.use ('/review', routerReview);
app.use ('/bussiness', routerBussiness);

AppDataSource.initialize()
.then(() => {
 console.log('Database connected');
 
 app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});
})
.catch(error => {
 console.log(error)
})
