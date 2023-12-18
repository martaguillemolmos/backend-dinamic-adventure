import { Router } from "express";
import { createAppointment, deleteAppointment, getAllApointments, getAppointmentByUser, updateAppointment } from "../controllers/appointmentsController";
import { auth } from "../middelware/auth";
const router = Router ();

export {router}

//Crear 
router.post("/",auth, createAppointment);
//Modificar 
router.put("/", updateAppointment);
//Recuperar por el id
router.get("/", auth, getAppointmentByUser);
//Recuperar todas 
router.get("/all", getAllApointments);
//Eliminar 
router.delete("/", deleteAppointment);
