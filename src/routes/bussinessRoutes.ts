import { Request, Response, Router } from "express";
import { getAllBussiness } from "../controllers/bussinessController";
const router = Router ();

export {router}

router.get("/", getAllBussiness);