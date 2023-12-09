import { Request, Response, Router } from "express";
import { getAllActivities } from "../controllers/activitiesController";
const router = Router ();

export {router}

router.get("/", getAllActivities);