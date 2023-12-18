import { Router } from "express";
import { createAppointment, deleteAppointment, getAllApointments, getApointmentsByDate, getAppointmentByUser, statusAppointment, updateAppointment } from "../controllers/appointmentsController";
import { auth } from "../middelware/auth";
import { isSuperAdmin } from "../middelware/isSuperAdmin";
const router = Router ();

export {router}

//Crear 
router.post("/",auth, createAppointment);
//Modificar 
router.put("/", updateAppointment);
//Modificar 
router.put("/status", auth, isSuperAdmin, statusAppointment);
//Recuperar por el id
router.get("/", auth, getAppointmentByUser);
//Recuperar todas 
router.get("/all", auth, isSuperAdmin, getAllApointments);
//Recuperar todas 
router.get("/date", getApointmentsByDate);
//Eliminar 
router.delete("/", deleteAppointment);
