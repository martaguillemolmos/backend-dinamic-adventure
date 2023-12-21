import { Router } from "express";
import { createAppointment, deleteAppointment, getAllApointments, getAppointmentsByDate, getAppointmentByUser, statusAppointment, updateAppointment, disponibilityDate } from "../controllers/appointmentsController";
import { auth } from "../middelware/auth";
import { isSuperAdmin } from "../middelware/isSuperAdmin";
const router = Router ();

export {router}

//Crear 
router.post("/",auth, createAppointment);
//Modificar 
router.put("/", auth, updateAppointment);
//Modificar 
router.put("/status", auth, isSuperAdmin, statusAppointment);
//Recuperar por el id
router.get("/", auth, getAppointmentByUser);
//Recuperar la disponibilida de la cita
router.post("/disponibility-activity", auth, disponibilityDate);
//Recuperar todas 
router.get("/all", auth, isSuperAdmin, getAllApointments);
//Recuperar todas 
router.get("/date", getAppointmentsByDate);
//Eliminar 
router.delete("/", deleteAppointment);
