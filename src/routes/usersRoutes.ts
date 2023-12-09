import { Request, Response, Router } from "express";
import { getAllUsers } from "../controllers/usersController";
const router = Router ();

export {router}

router.get("/", getAllUsers);