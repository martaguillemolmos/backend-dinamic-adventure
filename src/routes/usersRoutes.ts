import { Request, Response, Router } from "express";
import { createUser, deactivateAccount, getAllUsers, loginUser, profileUser, updatePassword, updateUser } from "../controllers/usersController";
import { auth } from "../middelware/auth";
const router = Router ();

export {router}

//Rutas para Usuarios

//Login:
router.post ("/", loginUser);
//Register: Crear un nuevo usuario.
router.post ("/register", createUser);
//Recuperar la información de todos los usuarios.
router.get("/", getAllUsers);
//Porfile: Recuperar toda la información del usuario.
router.get("/profile", auth, profileUser);
//Modificar la información del perfil.
router.put ("/", auth, updateUser);
//Inactivar la cuenta.
router.put ("/account", auth, deactivateAccount);
//Modificar el password.
router.patch ("/password", auth, updatePassword);