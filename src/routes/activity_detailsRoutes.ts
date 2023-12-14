import { Request, Response, Router } from "express";
import { createActivity_Details, deleteActivity_Details, getActivity_DetailsById, getAllActivity_Details, updateActivity_Details } from "../controllers/acitivity_detailsController";
const router = Router ();

export {router}

//Crear 
router.post("/", createActivity_Details);
//Modificar 
router.put("/", updateActivity_Details);
//Recuperar por el id
router.get("/", getActivity_DetailsById);
//Recuperar todas 
router.get("/all", getAllActivity_Details);
//Eliminar 
router.delete("/", deleteActivity_Details);

