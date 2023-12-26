import { Router } from "express";
import { createBussiness, deleteBussiness, getAllBussiness, getBussinessById, updateBussiness } from "../controllers/bussinessController";
import { isSuperAdmin } from "../middelware/isSuperAdmin";
import { auth } from "../middelware/auth";
const router = Router ();

export {router}

//Crear 
router.post("/", auth, isSuperAdmin, createBussiness);
//Modificar 
router.put("/",auth, isSuperAdmin, updateBussiness);
//Recuperar por el id
router.get("/", getBussinessById);
//Recuperar todas 
router.get("/all", getAllBussiness);
//Eliminar 
router.delete("/", auth, isSuperAdmin, deleteBussiness);
