import { Request, Response, Router } from "express";
import { createUser, getAllUsers, loginUser, profileUser } from "../controllers/usersController";
import { auth } from "../middelware/auth";
const router = Router ();

export {router}

router.post ("/", loginUser);
router.post ("/register", createUser);
router.get("/", getAllUsers);
router.get("/profile", auth, profileUser);
