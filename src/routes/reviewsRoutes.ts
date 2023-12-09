import { Request, Response, Router } from "express";
import { getAllReviews } from "../controllers/reviewsController";
const router = Router ();

export {router}

router.get("/", getAllReviews);