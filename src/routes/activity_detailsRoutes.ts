import {Router } from "express";
import { createActivity_Details, deleteActivity_Details, getActivity_DetailsById, getAllActivity_Details, updateActivity_Details } from "../controllers/acitivity_detailsController";
import { auth } from "../middelware/auth";
import { isSuperAdmin } from "../middelware/isSuperAdmin";
const router = Router ();

export {router}

//Crear 
router.post("/", auth, isSuperAdmin, createActivity_Details);
//Modificar 
router.put("/", auth, isSuperAdmin, updateActivity_Details);
//Recuperar por el id
router.get("/", getActivity_DetailsById);
//Recuperar todas 
router.get("/all", getAllActivity_Details);
//Eliminar 
router.delete("/", auth, isSuperAdmin, deleteActivity_Details);

