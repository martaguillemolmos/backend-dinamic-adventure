import { Request, Response, Router } from "express";
import { createUser, getAllUsers } from "../controllers/usersController";
const router = Router ();

export {router}

router.get("/", getAllUsers);
router.post ("/", createUser);