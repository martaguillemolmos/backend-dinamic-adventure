import express, { Request, Response } from "express";
import { router as routerUser } from "./routes/usersRoutes";
import { router as routerActivity } from "./routes/activitiesRoutes";
import { router as routerDetails } from "./routes/activitydetailRoutes";
import { router as routerAppointment } from "./routes/appointmentsRoutes";
import { router as routerReview } from "./routes/reviewsRoutes";
import { router as routerBussiness } from "./routes/bussinessRoutes";

const app = express ()

const PORT = process.env.PORT || 4000;

app.listen (PORT, () => {
    console.log(`Server running ${PORT}`);
})

app.use ('/user', routerUser);
app.use ('/activity', routerActivity);
app.use ('/details', routerDetails);
app.use ('/appointment', routerAppointment);
app.use ('/review', routerReview);
app.use ('/bussiness', routerBussiness);