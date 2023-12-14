import { Request, Response, Router } from "express";
import { createBussiness, deleteBussiness, getAllBussiness, getBussinessById, updateBussiness } from "../controllers/bussinessController";
const router = Router ();

export {router}

//Crear 
router.post("/", createBussiness);
//Modificar 
router.put("/", updateBussiness);
//Recuperar por el id
router.get("/", getBussinessById);
//Recuperar todas 
router.get("/all", getAllBussiness);
//Eliminar 
router.delete("/", deleteBussiness);
