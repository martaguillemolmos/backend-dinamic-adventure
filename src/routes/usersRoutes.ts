import { Request, Response, Router } from "express";
import { createUser, deactivateAccount, getAllUsers, loginSuper, loginUser, profileUser, updatePassword, updateUser } from "../controllers/usersController";
import { auth } from "../middelware/auth";
import { isSuperAdmin } from "../middelware/isSuperAdmin";
const router = Router ();

export {router}

//Rutas para Usuarios

//Login:
router.post ("/", loginUser);
//Register: Crear un nuevo usuario.
router.post ("/register", createUser);
//Recuperar la información de todos los usuarios.
router.get("/", auth, isSuperAdmin, getAllUsers);
//Acceder al panel de administración
router.post("/login", auth, isSuperAdmin, loginSuper);
//Profile: Recuperar toda la información del usuario.
router.get("/profile", auth, profileUser);
//Modificar la información del perfil.
router.put ("/", auth, updateUser);
//Inactivar la cuenta.
router.put ("/account", auth, deactivateAccount);
//Modificar el password.
router.patch ("/password", auth, updatePassword);
