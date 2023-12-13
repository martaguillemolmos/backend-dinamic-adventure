import { Request, Response, Router } from "express";
import { createActivity, deleteActivity, getActivityById, getActivityByType, getAllActivities, updateActivity } from "../controllers/activitiesController";
const router = Router ();

export {router}

//Crear actividad
router.post("/", createActivity);
//Modificar una actividad
router.put("/", updateActivity);
//Recuperar una actividad por el id
router.get("/", getActivityById);
//Recuperar las actividades por el Type
router.get("/type", getActivityByType);
//Recuperar todas las actividades
router.get("/all", getAllActivities);
//Eliminar una actividad
router.delete("/", deleteActivity);

