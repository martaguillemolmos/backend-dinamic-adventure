import { Request, Response, Router } from "express";
import { createActivity, deleteActivity, getActivityById, getActivityByType, getAllActivities, updateActivity } from "../controllers/activitiesController";
const router = Router ();

export {router}

//Crear actividad
router.post("/", createActivity);
//Modificar una actividad
router.put("/", updateActivity);
//Recuperar una actividad por el id
router.put("/:id", getActivityById);
//Recuperar todas las actividades
router.get("/all", getAllActivities);
//Recuperar las actividades por el Type
router.get("/:type", getActivityByType);
//Eliminar una actividad
router.delete("/", deleteActivity);

