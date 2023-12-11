import { Request, Response, Router } from "express";
import { createUser, getAllUsers, loginUser, profileUser } from "../controllers/usersController";
import { auth } from "../middelware/auth";
const router = Router ();

export {router}

router.post ("/", createUser);
router.post ("/login", loginUser);
router.get("/", getAllUsers);
router.get("/profile", auth, profileUser);
