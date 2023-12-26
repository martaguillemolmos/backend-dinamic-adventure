import {  Router } from "express";
import { createDetails, deleteDetailsById, getAllDetails, getDetailsById, getDetailsByType, updateDetailsById } from "../controllers/detailsController";
import { auth } from "../middelware/auth";
import { isSuperAdmin } from "../middelware/isSuperAdmin";
const router = Router ();

export {router}

//Crear detalles
router.post("/", auth, isSuperAdmin, createDetails);
//Actualizar la información por el Id
router.put("/",auth, isSuperAdmin, updateDetailsById);
//Recuperar la información de un detalle por el Id
router.get("/", getDetailsById);
//Recuperar la información de un detalle por el type
router.get("/type", getDetailsByType);
// Recuperar todos los detalles
router.get("/all", auth, isSuperAdmin, getAllDetails);
//Eliminar un detalle por el Id
router.delete("/", auth, isSuperAdmin, deleteDetailsById);
