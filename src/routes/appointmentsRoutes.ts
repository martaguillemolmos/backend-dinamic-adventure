import { Request, Response, Router } from "express";
import { getAllApointments } from "../controllers/appointmentsController";
const router = Router ();

export {router}

router.get("/", getAllApointments);