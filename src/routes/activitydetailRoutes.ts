import { Request, Response, Router } from "express";
import { getAllDetails } from "../controllers/activitydetailController";
const router = Router ();

export {router}

router.get("/", getAllDetails);