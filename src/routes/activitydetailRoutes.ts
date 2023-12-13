import { Request, Response, Router } from "express";
import { createDetails, deleteDetailsById, getAllDetails, getDetailsById, getDetailsByType, updateDetailsById } from "../controllers/activitydetailController";
const router = Router ();

export {router}

//Crear detalles
router.post("/", createDetails);
//Actualizar la información por el Id
router.put("/", updateDetailsById);
//Recuperar la información de un detalle por el Id
router.get("/", getDetailsById);
//Recuperar la información de un detalle por el type
router.get("/type", getDetailsByType);
// Recuperar todos los detalles
router.get("/all", getAllDetails);
//Eliminar un detalle por el Id
router.delete("/", deleteDetailsById);
