import { Request, Response, Router } from "express";
import { createActivity, deleteActivity, getActivityById, getActivityByType, getAllActivities, updateActivity } from "../controllers/activitiesController";
import { isSuperAdmin } from "../middelware/isSuperAdmin";
import { auth } from "../middelware/auth";
const router = Router ();

export {router}

//Crear actividad
router.post("/", auth, isSuperAdmin, createActivity);
//Modificar una actividad
router.put("/",auth, isSuperAdmin, updateActivity);
//Recuperar una actividad por el id
router.put("/:id", getActivityById);
//Recuperar todas las actividades
router.get("/all", getAllActivities);
//Recuperar las actividades por el Type
router.get("/:type", getActivityByType);
//Eliminar una actividad
router.delete("/", auth, isSuperAdmin, deleteActivity);

