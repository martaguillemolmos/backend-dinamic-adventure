import { Router } from "express";
import { createAppointment, deleteAppointment, getAllApointments, getAppointmentById, updateAppointment } from "../controllers/appointmentsController";
const router = Router ();

export {router}

//Crear 
router.post("/", createAppointment);
//Modificar 
router.put("/", updateAppointment);
//Recuperar por el id
router.get("/", getAppointmentById);
//Recuperar todas 
router.get("/all", getAllApointments);
//Eliminar 
router.delete("/", deleteAppointment);
